import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { vacancies } from '../../../../consts/vacancies';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';

@Component({
    templateUrl: './about-company.page.html',
    styleUrls: ['./styles/about-company.page.scss'],
    providers: [
        DestroyService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutCompanyPage {

    public vacancyList: IVacancyCard[] = vacancies;
    public isShowAll$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public updateShowVacancies(flag: boolean): void {
        this.isShowAll$.next(flag);
    }

    public goToBack(): void {
        history.back();
    }
}
