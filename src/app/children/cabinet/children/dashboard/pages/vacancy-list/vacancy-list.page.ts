import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';
import { RequestVacancyService } from '../../services/request-vacancy.service';

@Component({
    templateUrl: './vacancy-list.page.html',
    styleUrls: ['./styles/vacancy-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyListPage {

    public name: string = '';
    public vacancyList$: Observable<IVacancyCard[]>;
    private _requestVacancyService: RequestVacancyService = inject(RequestVacancyService);

    constructor () {
        this.vacancyList$ = this._requestVacancyService.getVacancyList();
    }

    public goToBack(): void {
        history.back();
    }
}
