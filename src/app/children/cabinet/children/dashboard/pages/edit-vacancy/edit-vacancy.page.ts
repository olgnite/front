import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { getErrorMessages } from '../../../../../../utils/get-error-messages';
import { IVacancyCardRequest } from '../../../../interfaces/vacancy-card.interface';
import { EmploymentsType } from '../../enums/employments.enum';
import { ExperiencesType } from '../../enums/experiences.enum';
import { RequestVacancyService } from '../../services/request-vacancy.service';
import { VacancyViewModel } from '../../view-model/vacancy.view-model';
 
@Component({
    templateUrl: './edit-vacancy.page.html',
    styleUrls: ['./styles/edit-vacancy.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditVacancyPage {

    public viewModel$!: Observable<VacancyViewModel>;
    public vacancy$!: Observable<IVacancyCardRequest>;
    public employments: string[] = Object.values(EmploymentsType);
    public experiences: string[] = Object.values(ExperiencesType);

    private _requestVacancyService: RequestVacancyService = inject(RequestVacancyService);
    private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private _destroy$: DestroyService = inject(DestroyService);

    constructor() {
        this.viewModel$ = this._activatedRoute.params
            .pipe(
                switchMap((params: Params) => this._requestVacancyService.getVacancyById(params['id'])),
                map((vacancy: IVacancyCardRequest) => {
                    this.vacancy$ = of(vacancy);

                    return new VacancyViewModel(vacancy);
                })
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

    public getErrorMessages<T, R extends T>(control: AbstractControl<T, R>): string[] {
        return getErrorMessages(control);
    }

    public goToBack(): void {
        history.back();
    }
}
