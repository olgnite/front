import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map, switchMap, takeUntil, tap } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';
import { RequestVacancyService } from '../../services/request-vacancy.service';
import { VacancyViewModel } from '../../view-model/vacancy.view-model';

@Component({
    templateUrl: './edit-vacancy.page.html',
    styleUrls: ['./styles/edit-vacancy.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditVacancyPage {

    public viewModel$!: Observable<VacancyViewModel>;

    private _requestVacancyService: RequestVacancyService = inject(RequestVacancyService);
    private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private _destroy$: DestroyService = inject(DestroyService);

    constructor() {
        this.viewModel$ = this._activatedRoute.params
            .pipe(
                switchMap((params: Params) => this._requestVacancyService.getVacancyById(params['id'])),
                map((vacancy: IVacancyCard) => new VacancyViewModel(vacancy))
            );
    }

    public onSubmit(model: VacancyViewModel): void {
        this._activatedRoute.params
            .pipe(
                switchMap((params: Params) => this._requestVacancyService.updateVacancy(model.toModel(), params['id'])),
                tap(() => this.goToBack()),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    public goToBack(): void {
        history.back();
    }
}
