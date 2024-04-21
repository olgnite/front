import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'vacancies',
    templateUrl: './vacancies.component.html',
    styleUrls: ['./styles/vacancies.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacanciesComponent {

}
