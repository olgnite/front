import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, map, of, switchMap, zip } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { IVacancyCardRequest } from '../../../../interfaces/vacancy-card.interface';
import { ICompanyV2Request } from '../../interfaces/company.interface';
import { RequestCompanyService } from '../../services/request-company.service';
import { RequestVacancyService } from '../../services/request-vacancy.service';
import { AUTHORIZED_COMPANY } from '../../tokens/authorized-company.token';

@Component({
    templateUrl: './about-company.page.html',
    styleUrls: ['./styles/about-company.page.scss'],
    providers: [
        DestroyService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutCompanyPage {

    public vacancyList$?: Observable<IVacancyCardRequest[]>;
    public company$!: Observable<ICompanyV2Request>;
    public isShowAll$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isShowVacancyList$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private _requestVacancyService: RequestVacancyService = inject(RequestVacancyService);
    private _requestCompanyService: RequestCompanyService = inject(RequestCompanyService);

    constructor(
        @Inject(AUTHORIZED_COMPANY) private _authorizedCompany: Observable<ICompanyV2Request>,
        @Inject(ActivatedRoute) private _activatedRoute: ActivatedRoute
    ) {
        this.company$ = this._activatedRoute.params
            .pipe(
                switchMap(params => {
                    return params['id'] ? this._requestCompanyService.getCompanyById(params['id']) : this._authorizedCompany;
                }),
                switchMap((company: ICompanyV2Request) => {
                    return zip(of(company), this._requestVacancyService.getVacancyList());
                }),
                map(([company, list]: [ICompanyV2Request, IVacancyCardRequest[]]) => {
                    const newList: IVacancyCardRequest[] = list.filter(item => item.company_id === company.id);
                    this.vacancyList$ = of(newList);
                    this.isShowVacancyList$.next(!!newList.length);

                    return company;
                })
            );
    }

    public updateShowVacancies(flag: boolean): void {
        this.isShowAll$.next(flag);
    }

    public goToBack(): void {
        history.back();
    }
}
