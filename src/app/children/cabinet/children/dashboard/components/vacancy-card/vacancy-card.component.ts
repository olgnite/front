import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';

@Component({
    selector: 'vacancy-card',
    templateUrl: './vacancy-card.component.html',
    styleUrls: ['./styles/vacancy-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyCardComponent {

    @Input()
    public vacancyCard!: IVacancyCard;
}
