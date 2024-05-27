import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBaseViewModel } from './form-base.view-model';

export class ChangePasswordViewModel extends FormBaseViewModel<IChangePasswordDto> {
    public get currentPassword(): string {
        return this.form.get('currentPassword')?.value;
    }
    public get newPassword(): string {
        return this.form.get('newPassword')?.value;
    }
    public get repeatPassword(): string {
        return this.form.get('repeatPassword')?.value;
    }

    public form: FormGroup;

    constructor() {
        super();
        this.form = new FormGroup<IChangePasswordModel>({
            currentPassword: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
            newPassword: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
            repeatPassword: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
        });
    }

    public toModel(): IChangePasswordDto {
        return {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            repeatPassword: this.repeatPassword
        };
    }
}

export interface IChangePasswordDto {
    currentPassword: string;
    newPassword: string;
    repeatPassword: string;
}

export interface IChangePasswordModel {
    currentPassword: AbstractControl<string>;
    newPassword: AbstractControl<string>;
    repeatPassword: AbstractControl<string>;
}
