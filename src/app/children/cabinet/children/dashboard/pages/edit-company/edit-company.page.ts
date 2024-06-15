import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, switchMap, takeUntil, tap } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { getErrorMessages } from '../../../../../../utils/get-error-messages';
import { ICompany, ICompanyV2Request } from '../../interfaces/company.interface';
import { IPhoto, IPhotoRequest } from '../../interfaces/photo.interface';
import { RequestCompanyService } from '../../services/request-company.service';
import { RequestPhotoGalleryService } from '../../services/request-photogallery.service';
import { AUTHORIZED_COMPANY } from '../../tokens/authorized-company.token';

@Component({
    templateUrl: './edit-company.page.html',
    styleUrls: ['./styles/edit-company.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCompanyPage implements OnInit {
    @ViewChild('fileInput', { static: false }) fileInput: any;
    @ViewChild('photoInput', { static: false }) photoInput: any;

    public img$: BehaviorSubject<{ id: string, url: string } | null> = new BehaviorSubject<{ id: string, url: string } | null>(null);
    public editForm$?: Observable<FormGroup>;
    public photoList$?: Observable<IPhoto[]>;
    public update$: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);
    public companyData$: BehaviorSubject<ICompanyV2Request | null> = new BehaviorSubject<ICompanyV2Request | null>(null);

    private fromBuilder: FormBuilder = inject(FormBuilder);
    private requestCompanyService: RequestCompanyService = inject(RequestCompanyService);
    private requestPhotoGalleryService: RequestPhotoGalleryService = inject(RequestPhotoGalleryService);
    private destroy$: DestroyService = inject(DestroyService);

    constructor(
        @Inject(AUTHORIZED_COMPANY) private _authorizedCompany: Observable<ICompanyV2Request>
    ) {
    }

    public ngOnInit(): void {
        this.initialize();
        this.getGalleryList();
    }

    public initialize(): void {
        this.editForm$ = this._authorizedCompany
            .pipe(
                map(company => ({
                    industry: company.field_of_activity,
                    yearOfFoundation: company.field_of_activity,
                    numberOfEmployees: company.number_of_employees,
                    aboutCompany: '',
                    site: company.personal_site,
                    ...company
                })),
                map(company => {
                    this.img$.next({ id: company.image_id || '', url: company.image_url || '' });
                    this.companyData$.next(company);

                    return this.fromBuilder.group({
                        industry: [company.field_of_activity, Validators.required],
                        yearOfFoundation: company.year_of_foundation,
                        city: company.city,
                        street: company.street,
                        house: company.house,
                        numberOfEmployees: [company.number_of_employees, Validators.pattern(/[0-9]|\./)],
                        aboutCompany: company.description,
                        site: [company.personal_site, Validators.required],
                        phone: [company.phone, [Validators.pattern(/^\+7\d{10}$/)]],
                        email: [company.email, Validators.email],
                    })
                })
            );
    }

    public onSubmit(form: FormGroup): void {
        const company: ICompany = form.value as ICompany;
        this.requestCompanyService.updateCompany({
            ...this.companyData$.value,
            description: company.aboutCompany,
            field_of_activity: company.industry,
            year_of_foundation: company.yearOfFoundation,
            city: company.city,
            street: company.street,
            house: company.house,
            number_of_employees: company.numberOfEmployees,
            personal_site: company.site,
            phone: company.phone,
            social_network_link: company.link,
            contact_email: company.email,
        })
            .pipe(
                tap(() => this.goToBack()),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public removeImageGallery(id: string): void {
        this.requestPhotoGalleryService.removePhoto(id)
            .pipe(
                tap(() => this.update$.next()),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public removeAvatar(): void {
        this.requestPhotoGalleryService.removePhoto(this.img$.value?.id || '')
            .pipe(
                tap(() => this.img$.next(null)),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public pushMainImageGallery(event: any): void {
        this.requestPhotoGalleryService.addPhoto(this.getFormDataFile(event))
            .pipe(
                tap(() => this.update$.next()),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public pushMainImageAvatar(event: any): void {
        this.requestPhotoGalleryService.addPhoto(this.getFormDataFile(event), true)
            .pipe(
                switchMap(() => this._authorizedCompany),
                tap(company => this.img$.next({ id: company.image_id || '', url: company.image_url || '' })),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
    
    public trackByFn(index: number, item: IPhoto): string {
        return `${item.id}`;
    }

    public getErrorMessages<T, R extends T>(control: AbstractControl<T, R>): string[] {
        return getErrorMessages(control);
    }

    public uploadImage(): void {
        this.fileInput.nativeElement.click();
    }

    public uploadPhoto(): void {
        this.photoInput.nativeElement.click();
    }

    public goToBack(): void {
        history.back();
    }

    private getGalleryList(): void {
        this.photoList$ = this.update$
            .pipe(
                switchMap(() => this.requestPhotoGalleryService.getPhotoGallery()),
                map((data: IPhotoRequest[]) => {
                    return data.map((item: IPhotoRequest) => ({
                        imageUrl: item.image_url,
                        name: item.name,
                        createAt: item.created_at,
                        id: item.id
                    }))
                })
            );
    }

    private getFormDataFile(event: any): FormData {
        const file = event.target.files[0];
        const form: FormData = new FormData();
        form.append('file', new File([file], file.name));

        return form;
    }
}
