import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'photo-gallery',
    templateUrl: './photo-gallery.component.html',
    styleUrls: ['./styles/photo-gallery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoGalleryComponent {

}
