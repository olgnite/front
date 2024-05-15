import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';
import { RequestVacancyService } from '../../services/request-vacancy.service';

@Component({
    templateUrl: './about-company.page.html',
    styleUrls: ['./styles/about-company.page.scss'],
    providers: [
        DestroyService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutCompanyPage {

    public vacancyList$?: Observable<IVacancyCard[]>;
    public isShowAll$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _requestVacancyService: RequestVacancyService = inject(RequestVacancyService);

    constructor() {
        this.vacancyList$ = this._requestVacancyService.getVacancyList();
    }

    public updateShowVacancies(flag: boolean): void {
        this.isShowAll$.next(flag);
    }

    public goToBack(): void {
        history.back();
    }
}
