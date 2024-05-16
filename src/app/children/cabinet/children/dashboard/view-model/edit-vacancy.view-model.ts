import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBaseViewModel } from './form-base.view-model';

export class EditVacancyViewModel extends FormBaseViewModel<IEditVacancyModel> {
    public get name(): AbstractControl<string> {
        return this.form.get('name')?.value;
    }
    public get salary(): AbstractControl<string> {
        return this.form.get('salary')?.value;
    }
    public get city(): AbstractControl<string> {
        return this.form.get('city')?.value;
    }
    public get employment(): AbstractControl<string> {
        return this.form.get('employment')?.value;
    }
    public get experience(): AbstractControl<string> {
        return this.form.get('experience')?.value;
    }
    public get description(): AbstractControl<string> {
        return this.form.get('description')?.value;
    }

    public form: FormGroup;

    constructor() {
        super();

        this.form = new FormGroup<IEditVacancyModel>({
            name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            salary: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            employment: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            experience: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            description: new FormControl('', { nonNullable: true }),
        })
    }

    public toModel(): IEditVacancyModel {
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

interface IEditVacancyModel {
    name: AbstractControl<string>,
    salary: AbstractControl<string>,
    city: AbstractControl<string>,
    employment: AbstractControl<string>,
    experience: AbstractControl<string>,
    description: AbstractControl<string>,
}
