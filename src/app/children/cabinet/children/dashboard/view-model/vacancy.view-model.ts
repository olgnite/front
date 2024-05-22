import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBaseViewModel } from './form-base.view-model';
import { IVacancyCard } from '../../../interfaces/vacancy-card.interface';

export class VacancyViewModel extends FormBaseViewModel<IVacancyCard> {
    public get name(): string {
        return this.form.get('name')?.value;
    }
    public get salary(): number {
        return this.form.get('salary')?.value;
    }
    public get city(): string {
        return this.form.get('city')?.value;
    }
    public get employment(): string {
        return this.form.get('employment')?.value;
    }
    public get experience(): string {
        return this.form.get('experience')?.value;
    }
    public get description(): string {
        return this.form.get('description')?.value;
    }

    public form: FormGroup;

    constructor(public vacancyCard?: IVacancyCard) {
        super();

        this.form = new FormGroup<IVacancyModel>({
            name: new FormControl(vacancyCard?.name || '', { nonNullable: true, validators: [Validators.required] }),
            salary: new FormControl(vacancyCard?.salary || null, { nonNullable: false, validators: [Validators.required] }),
            city: new FormControl(vacancyCard?.city || '', { nonNullable: true, validators: [Validators.required] }),
            employment: new FormControl(vacancyCard?.employment || '', { nonNullable: true, validators: [Validators.required] }),
            experience: new FormControl(vacancyCard?.experience || '', { nonNullable: true, validators: [Validators.required] }),
            description: new FormControl(vacancyCard?.description || '', { nonNullable: true }),
        })
    }

    public toModel(): IVacancyCard {
        return {
            name: this.name,
            salary: this.salary,
            city: this.city,
            employment: this.employment,
            experience: this.experience,
            description: this.description
        }
    }
}

interface IVacancyModel {
    name: AbstractControl<string>,
    salary: AbstractControl<number | null>,
    city: AbstractControl<string>,
    employment: AbstractControl<string>,
    experience: AbstractControl<string | undefined>,
    description: AbstractControl<string | undefined>,
}
