import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DestroyService } from '../../../../../../services/destroy.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable, map, switchMap, takeUntil, tap } from 'rxjs';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';
import { RequestVacancyService } from '../../services/request-vacancy.service';

@Component({
    templateUrl: './about-vacancy.page.html',
    styleUrls: ['./styles/about-vacancy.page.scss'],
    providers: [
        DestroyService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutVacancyPage {

    public vacancyCard$: Observable<IVacancyCard>;

    private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private _requestVacancyService: RequestVacancyService = inject(RequestVacancyService);

    constructor() {
        this.vacancyCard$ = this._activatedRoute.params
            .pipe(
                switchMap((params: Params) => {
                    return this._requestVacancyService.getVacancyById(params['id'])
                }),
            )
    }

    public goToBack(): void {
        history.back();
    }
}
