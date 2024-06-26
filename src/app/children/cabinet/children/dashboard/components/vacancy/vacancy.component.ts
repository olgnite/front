import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthorizationService } from "../../../../../../services/authorization.service";
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';
import { ICompanyV2Request } from '../../interfaces/company.interface';
import { IPhotoRequest } from '../../interfaces/photo.interface';
import { RequestPhotoGalleryService } from '../../services/request-photogallery.service';
import { AUTHORIZED_COMPANY } from '../../tokens/authorized-company.token';

@Component({
    selector: 'vacancy',
    templateUrl: './vacancy.component.html',
    styleUrls: ['./styles/vacancy.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyComponent implements OnInit {
    @Input()
    public vacancy!: IVacancyCard;

    @Output()
    public showDialogRemove: EventEmitter<string> = new EventEmitter<string>();

    public company$?: Observable<ICompanyV2Request>;
    public imageCompany$?: Observable<IPhotoRequest>;
    public readonly isLoggedIn$: BehaviorSubject<boolean> = this._authorizationService.isLoggedIn$;

    constructor(
        @Inject(AuthorizationService) private _authorizationService: AuthorizationService,
        @Inject(RequestPhotoGalleryService) private _requestPhotoGalleryService: RequestPhotoGalleryService,
        @Inject(AUTHORIZED_COMPANY) private _autorizedCompany: Observable<ICompanyV2Request>
    ) {
    }

    public ngOnInit(): void {
        this.company$ = this._autorizedCompany;
        this.imageCompany$ = this._requestPhotoGalleryService.getPhotoById('be674599-edd1-4eab-b5e9-24f233944b35');
    }

    public removeEmit(id: string): void {
        this.showDialogRemove.emit(id);
    }
}
