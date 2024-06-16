import { ChangeDetectionStrategy, Component, Inject, Injector, inject } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, Observable, map, of, switchMap, takeUntil, zip } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { IVacancyCard, IVacancyCardRequest } from '../../../../interfaces/vacancy-card.interface';
import { RemoveVacancyModalComponent } from '../../components/remove-vacancy-modal/remove-vacancy-modal.component';
import { RequestVacancyService } from '../../services/request-vacancy.service';
import { AddVacancyModalComponent } from '../../components/add-vacancy-modal/add-vacancy-modal.component';
import { AuthorizationService } from "../../../../../../services/authorization.service";
import { AUTHORIZED_COMPANY } from '../../tokens/authorized-company.token';
import { ICompanyV2Request } from '../../interfaces/company.interface';

@Component({
    templateUrl: './vacancy-list.page.html',
    styleUrls: ['./styles/vacancy-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyListPage {
    public name: string = '';
    public vacancyList$: Observable<IVacancyCardRequest[]>;
    public readonly isLoggedIn$ = this._authorizationService.isLoggedIn$;
    
    private _requestVacancyService: RequestVacancyService = inject(RequestVacancyService);
    private _destroy$: DestroyService = inject(DestroyService);
    private _update$: BehaviorSubject<void | null> = new BehaviorSubject<void | null>(null);

    constructor(
        @Inject(TuiDialogService) public readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
        @Inject(AuthorizationService) private readonly _authorizationService: AuthorizationService,
        @Inject(AUTHORIZED_COMPANY) private _authorizedCompany: Observable<ICompanyV2Request>
    ) {
        this.vacancyList$ = this.getVacancyList()
            .pipe(
                switchMap(data => zip(this._authorizedCompany, of(data))),
                map(([company, list]: [ICompanyV2Request, IVacancyCardRequest[]]) => {
                    return this.isLoggedIn$.value ? list.filter(item => item.company_id === company.id) : list;
                })
            );
    }

    public openDialogRemove(vacancy: IVacancyCard): void {
        this.dialogs.open(new PolymorpheusComponent(RemoveVacancyModalComponent, this.injector), { size: 'auto', data: { vacancy: vacancy, update$: this._update$ } })
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    public openDialogAdd(): void {
        this.dialogs.open(new PolymorpheusComponent(AddVacancyModalComponent, this.injector), { data: { update$: this._update$ } })
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    public getVacancyList(): Observable<IVacancyCard[]> {
        return this._update$
            .pipe(
                switchMap(() => this._requestVacancyService.getVacancyList()),
            );
    }

    public goToBack(): void {
        history.back();
    }

    public trackByFn(index: number, item: IVacancyCardRequest): string {
        return `${item.id}`;
    }
}
