import { Pipe, PipeTransform } from '@angular/core';
import { IVacancyCard } from '../interfaces/vacancy-card.interface';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    public transform(vacancies: IVacancyCard[], value: string): IVacancyCard[] {
        if (!value) {
            return vacancies;
        }

        return vacancies.filter((item: IVacancyCard) => item.title.toLowerCase().includes(value.toLowerCase()));
    }
}
