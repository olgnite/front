import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, takeUntil, tap } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { ICompany } from '../../interfaces/company.interface';
import { EditCompanyService } from '../../services/edit-company.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CurrentPathService } from '../../../../services/current-path.service';

@Component({
    templateUrl: './edit-company.page.html',
    styleUrls: ['./styles/edit-company.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCompanyPage implements OnInit {
    @ViewChild('fileInput', { static: false }) fileInput: any;

    private fromBuilder: FormBuilder = inject(FormBuilder);

    public id: string = '4';
    public img$: BehaviorSubject<string> = new BehaviorSubject('');
    public editForm: FormGroup = this.fromBuilder.group({
        industry: ['', Validators.required],
        yearOfFoundation: '',
        city: '',
        street: '',
        house: '',
        numberOfEmployees: '',
        aboutCompany: ['', Validators.required],
        site: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\+7\d{10}$/)]],
        email: ['', Validators.email],
        link: ''
    });

    private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
    private editService: EditCompanyService = inject(EditCompanyService);
    private _destroy$: DestroyService = inject(DestroyService);
    private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private _currentPathService: CurrentPathService = inject(CurrentPathService);

    public ngOnInit(): void {
        this._activatedRoute.url
            .pipe(
                tap((value: UrlSegment[]) => this._currentPathService.updatePath(value[0].path)),
                takeUntil(this._destroy$)
            )
            .subscribe();

        combineLatest([this.editService.getCompanyInfo(this.id), this.editService.getCompanyMainImg(this.id)])
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe(([company, img]) => {
                if (company) {
                    this.editForm = this.fromBuilder.group({
                        industry: [company.industry, Validators.required],
                        yearOfFoundation: company.yearOfFoundation,
                        city: company.city,
                        street: company.street,
                        house: company.house,
                        numberOfEmployees: company.numberOfEmployees,
                        aboutCompany: [company.aboutCompany, Validators.required],
                        site: [company.site, Validators.required],
                        phone: [company.phone, [Validators.required, Validators.pattern(/^\+7\d{10}$/)]],
                        email: [company.email, Validators.email],
                        link: company.link
                    });
                };
                this.img$.next(img);

                this.cdr.markForCheck();
            });
    }

    public goToBack(): void {
        history.back();
    }

    public uploadImage(): void {
        this.fileInput.nativeElement.click();
    }

    public deleteImage(): void {
        this.img$.next(this.editService.deleteImg(this.id));
    }

    public async pushMainImage(event: any): Promise<void> {
        const file = event.target.files[0];

        this.img$.next(await this.editService.setMainImg(file, this.id));
    }

    public onSubmit(): void {
        const company: ICompany = this.editForm.value as ICompany;
        this.editService.setEdits(company, this.id);
    }
}
