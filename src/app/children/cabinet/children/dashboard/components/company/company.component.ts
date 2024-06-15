import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";
import { AuthorizationService } from "../../../../../../services/authorization.service";
import { ICompanyV2Request } from "../../interfaces/company.interface";
import { RequestCompanyService } from '../../services/request-company.service';
import { AUTHORIZED_COMPANY } from '../../tokens/authorized-company.token';

@Component({
    selector: 'company',
    templateUrl: './company.component.html',
    styleUrls: ['./styles/company.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent implements OnInit {
    public company$!: Observable<ICompanyV2Request>;
    public img$: BehaviorSubject<{ id: string, url: string } | null> = new BehaviorSubject<{ id: string, url: string } | null>(null);

    private authorizationService: AuthorizationService = inject(AuthorizationService);
    private requestCompanyService: RequestCompanyService = inject(RequestCompanyService);
    public isLoggedIn$: BehaviorSubject<boolean> = this.authorizationService.isLoggedIn$;

    constructor(
        @Inject(AUTHORIZED_COMPANY) private _authorizedCompany: Observable<ICompanyV2Request>,
        @Inject(ActivatedRoute) private _route: ActivatedRoute
    ) {
    }

    public ngOnInit(): void {
        this.company$ = this._route.params
            .pipe(
                switchMap((params: Params) => params['id'] ? this.requestCompanyService.getCompanyById(params['id']) : this._authorizedCompany),
                tap(company => this.img$.next({ id: company.image_id || '', url: company.image_url || '' }))
            );
    }

    public redirectToSite(url: string): void {
        window.open(url);
    }
}
