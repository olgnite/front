import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EditCompanyService} from "./services/edit-company.service";
import {ICompany} from "./interfaces/company.interface";
import {BehaviorSubject, combineLatest, takeUntil} from "rxjs";
import {DestroyService} from "../../../../../../services/destroy.service";

@Component({
    selector: 'edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./styles/edit-company.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCompanyComponent implements OnInit {
    private fromBuilder = inject(FormBuilder);
    private editService = inject(EditCompanyService);
    private _destroy$ = inject(DestroyService);
    private cdr = inject(ChangeDetectorRef);
    public id = '4';
    public img$ = new BehaviorSubject('');

    @ViewChild('fileInput', {static: false}) fileInput: any;

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
    })

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

    ngOnInit(): void {
        combineLatest([this.editService.getCompanyInfo(this.id), this.editService.getCompanyMainImg(this.id)]).pipe(
            takeUntil(this._destroy$)
        ).subscribe(([company, img]) => {
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
}
