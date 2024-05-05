import { ChangeDetectionStrategy, Component } from '@angular/core';
import { vacancies } from '../../../../consts/vacancies';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';

@Component({
    templateUrl: './vacancy-list.page.html',
    styleUrls: ['./styles/vacancy-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyListPage {

    public name: string = '';
    public vacancyList: IVacancyCard[] = vacancies;

    public goToBack(): void {
        history.back();
    }
}
