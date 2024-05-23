import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, of, switchMap, takeUntil, tap, zip } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { ICompany, ICompanyV2Request } from '../../interfaces/company.interface';
import { IPhoto, IPhotoRequest } from '../../interfaces/photo.interface';
import { RequestCompanyService } from '../../services/request-company.service';
import { RequestPhotoGalleryService } from '../../services/request-photogallery.service';

@Component({
    templateUrl: './edit-company.page.html',
    styleUrls: ['./styles/edit-company.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCompanyPage implements OnInit {
    @ViewChild('fileInput', { static: false }) fileInput: any;
    @ViewChild('photoInput', { static: false }) photoInput: any;

    public id: string = '4';
    public img$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public editForm$?: Observable<FormGroup>;
    public photoList$?: Observable<IPhoto[]>;
    public update$: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);

    private fromBuilder: FormBuilder = inject(FormBuilder);
    private requestCompanyService: RequestCompanyService = inject(RequestCompanyService);
    private requestPhotoGalleryService: RequestPhotoGalleryService = inject(RequestPhotoGalleryService);
    private destroy$: DestroyService = inject(DestroyService);

    public ngOnInit(): void {
        this.initialize();
        this.photoList$ = this.getGalleryList();
    }

    public initialize(): void {
        this.editForm$ = this.requestCompanyService.getCompanyById('ff74a67a-9ad8-4d3a-b554-1cbe2d91cb28')
            .pipe(
                map((company: ICompanyV2Request) => {
                    return {
                        industry: company.field_of_activity,
                        yearOfFoundation: company.field_of_activity,
                        numberOfEmployees: company.number_of_employees,
                        aboutCompany: '',
                        site: company.personal_site,
                        link: company.social_network_link,
                        ...company
                    };
                }),
                switchMap(company => {
                    return zip(this.requestPhotoGalleryService.getPhotoById('be674599-edd1-4eab-b5e9-24f233944b35'), of(company));
                }),
                map(([img, company]) => {
                    this.img$.next(img.image_url);

                    return this.fromBuilder.group({
                        industry: company.field_of_activity,
                        yearOfFoundation: company.year_of_foundation,
                        city: company.city,
                        street: company.street,
                        house: company.house,
                        numberOfEmployees: company.number_of_employees,
                        aboutCompany: [company.description, Validators.required],
                        site: [company.personal_site, Validators.required],
                        phone: [company.phone, [Validators.pattern(/^\+7\d{10}$/)]],
                        email: [company.email, Validators.email],
                        link: company.social_network_link
                    })
                })
            );
    }

    public onSubmit(form: FormGroup): void {
        const company: ICompany = form.value as ICompany;
        this.requestCompanyService.updateCompany({
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

    public pushImageGallery(event: any): void {
        const file = event.target.files[0];
        const form: FormData = new FormData();
        form.append('file', new File([file], file.name));

        this.requestPhotoGalleryService.addPhoto(form)
            .pipe(
                tap(() => this.update$.next()),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public getGalleryList(): Observable<IPhoto[]> {
        return this.update$
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
            )
    }

    public removeImageGallery(id: string): void {
        this.requestPhotoGalleryService.removePhoto(id)
            .pipe(
                tap(() => this.update$.next()),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public uploadImage(): void {
        this.fileInput.nativeElement.click();
    }

    public uploadPhoto(): void {
        this.photoInput.nativeElement.click();
    }

    public deleteImage(): void {
        // this.img$.next(this.editService.deleteImg(this.id));
    }

    public async pushMainImage(event: any): Promise<void> {
        const file = event.target.files[0];

        // this.img$.next(await this.editService.setMainImg(file, this.id));
    }

    public goToBack(): void {
        history.back();
    }
}
