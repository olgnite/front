import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBaseViewModel } from './form-base.view-model';

export class ProfileViewModel extends FormBaseViewModel<IProfileModel> {

    public get name(): AbstractControl<string> {
        return this.form.get('name')?.value;
    }
    public get email(): AbstractControl<string> {
        return this.form.get('email')?.value;
    }
    public get password(): AbstractControl<string> {
        return this.form.get('password')?.value;
    }

    public form: FormGroup;

    constructor() {
        super()

        this.form = new FormGroup<IProfileModel>({
            name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
            email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
            password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
        })
    }

    public toModel(): IProfileModel {
        return {
            name: this.name,
            email: this.email,
            password: this.password
        }
    }

}

interface IProfileModel {
    name: AbstractControl<string>;
    email: AbstractControl<string>;
    password: AbstractControl<string>;
}
