import { ChangeDetectionStrategy, Component, Inject, Injector, inject } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, Observable, switchMap, takeUntil } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';
import { RemoveVacancyModalComponent } from '../../components/remove-vacancy-modal/remove-vacancy-modal.component';
import { RequestVacancyService } from '../../services/request-vacancy.service';
import { AddVacancyModalComponent } from '../../components/add-vacancy-modal/add-vacancy-modal.component';
import { AuthorizationService } from "../../../../../../services/authorization.service";

@Component({
    templateUrl: './vacancy-list.page.html',
    styleUrls: ['./styles/vacancy-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyListPage {
    private authorizationService = inject(AuthorizationService);
    public name: string = '';
    public vacancyList$: Observable<IVacancyCard[]>;

    private _requestVacancyService: RequestVacancyService = inject(RequestVacancyService);
    private _destroy$: DestroyService = inject(DestroyService);
    private _update$: BehaviorSubject<void | null> = new BehaviorSubject<void | null>(null);
    readonly isLoggedIn$ = this.authorizationService.isLoggedIn$;

    constructor(
        @Inject(TuiDialogService) public readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
    ) {
        this.vacancyList$ = this.getVacancyList();
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
            )
    }

    public goToBack(): void {
        history.back();
    }
}
