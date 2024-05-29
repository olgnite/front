import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IPhoto, IPhotoRequest } from '../../interfaces/photo.interface';
import { RequestPhotoGalleryService } from '../../services/request-photogallery.service';

@Component({
    selector: 'photo-gallery',
    templateUrl: './photo-gallery.component.html',
    styleUrls: ['./styles/photo-gallery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoGalleryComponent {

    public photoList$?: Observable<IPhoto[]>;
    private requestPhotoGalleryService: RequestPhotoGalleryService = inject(RequestPhotoGalleryService);

    constructor() {
        this.photoList$ = this.requestPhotoGalleryService.getPhotoGallery()
            .pipe(
                map((data: IPhotoRequest[]) => {
                    return data.map((item: IPhotoRequest) => ({
                        imageUrl: item.image_url,
                        name: item.name,
                        createAt: item.created_at
                    }))
                })
            );
    }

    public trackByFn(index: number, item: IPhoto): string {
        return `${item.id}`;
    }
}
