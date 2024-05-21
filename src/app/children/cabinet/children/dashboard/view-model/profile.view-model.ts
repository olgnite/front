import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBaseViewModel } from './form-base.view-model';

export class ProfileViewModel extends FormBaseViewModel<IProfile> {

    public get name(): string {
        return this.form.get('name')?.value;
    }
    public get email(): string {
        return this.form.get('email')?.value;
    }
    public get password(): string {
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

    public toModel(): IProfile {
        return {
            name: this.name,
            email: this.email,
            password: this.password
        }
    }

}

interface IProfile {
    name: string;
    email: string;
    password: string;
}

interface IProfileModel {
    name: AbstractControl<string>;
    email: AbstractControl<string>;
    password: AbstractControl<string>;
}
