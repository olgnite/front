import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';

@Component({
    selector: 'vacancy',
    templateUrl: './vacancy.component.html',
    styleUrls: ['./styles/vacancy.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyComponent {
    @Input()
    public vacancy!: IVacancyCard;
}
