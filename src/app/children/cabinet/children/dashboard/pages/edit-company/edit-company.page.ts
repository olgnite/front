import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { ICompany } from '../../interfaces/company.interface';
import { EditCompanyService } from '../../services/edit-company.service';
import { RequestPhotoGalleryService } from '../../services/request-photogallery.service';

@Component({
    templateUrl: './edit-company.page.html',
    styleUrls: ['./styles/edit-company.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCompanyPage implements OnInit {
    @ViewChild('fileInput', { static: false }) fileInput: any;

    public id: string = '4';
    public img$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public editForm$?: Observable<FormGroup>;

    private fromBuilder: FormBuilder = inject(FormBuilder);
    private editService: EditCompanyService = inject(EditCompanyService);
    private requestPhotoGalleryService: RequestPhotoGalleryService = inject(RequestPhotoGalleryService);

    public ngOnInit(): void {
        this.initialize();
    }

    public initialize(): void {
        this.editForm$ = combineLatest([
            this.editService.getCompanyInfo(this.id),
            this.editService.getCompanyMainImg(this.id)
        ])
            .pipe(
                map(([company, img]) => {
                    this.img$.next(img);

                    return this.fromBuilder.group({
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
                    })
                }),
            );
    }

    public onSubmit(form: FormGroup): void {
        const company: ICompany = form.value as ICompany;
        this.editService.setEdits(company, this.id);
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

    public pushImagePhotoGallery(event: any): void {
        const file = event.target.files[0];
        const list = [];

        list.push(file);

        console.log(list);
    }

    public goToBack(): void {
        history.back();
    }
}
