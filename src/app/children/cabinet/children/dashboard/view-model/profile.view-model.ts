import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBaseViewModel } from './form-base.view-model';
import { ICompanyV2Request } from '../interfaces/company.interface';

export class ProfileViewModel extends FormBaseViewModel<IProfile> {

    public get name(): string {
        return this.form.get('name')?.value;
    }
    public get email(): string {
        return this.form.get('email')?.value;
    }
    public get inn(): string {
        return this.form.get('inn')?.value;
    }

    public form: FormGroup;

    constructor(company?: ICompanyV2Request) {
        super()

        this.form = new FormGroup<IProfileModel>({
            name: new FormControl<string>(company?.company_name || '', { nonNullable: true, validators: [Validators.required] }),
            email: new FormControl<string>(company?.email || '', { nonNullable: true, validators: [Validators.required] }),
            inn: new FormControl<string>(company?.inn || '', { nonNullable: true, validators: [Validators.required] })
        })
    }

    public toModel(): IProfile {
        return {
            name: this.name,
            email: this.email,
            inn: this.inn
        }
    }

}

interface IProfile {
    name: string;
    email: string;
    inn?: string;
}

interface IProfileModel {
    name: AbstractControl<string>;
    email: AbstractControl<string>;
    inn: AbstractControl<string>;
}
