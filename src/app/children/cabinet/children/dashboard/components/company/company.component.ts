import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AuthorizationService } from "../../../../../../services/authorization.service";
import { ICompanyV2Request } from "../../interfaces/company.interface";
import { IPhotoRequest } from '../../interfaces/photo.interface';
import { RequestCompanyService } from '../../services/request-company.service';
import { RequestPhotoGalleryService } from '../../services/request-photogallery.service';

@Component({
    selector: 'company',
    templateUrl: './company.component.html',
    styleUrls: ['./styles/company.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent implements OnInit {
    public company$!: Observable<ICompanyV2Request>;
    public img$!: Observable<IPhotoRequest>;

    private authorizationService = inject(AuthorizationService);
    private requestCompanyService = inject(RequestCompanyService)
    private requestPhotoGalleryService = inject(RequestPhotoGalleryService);

    isLoggedIn$ = this.authorizationService.isLoggedIn$;

    ngOnInit(): void {
        this.company$ = this.requestCompanyService.getCompanyById('ff74a67a-9ad8-4d3a-b554-1cbe2d91cb28');
        this.img$ = this.requestPhotoGalleryService.getPhotoById('be674599-edd1-4eab-b5e9-24f233944b35');
    }
}
