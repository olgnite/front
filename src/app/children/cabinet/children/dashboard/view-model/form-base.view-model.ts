import { FormGroup } from '@angular/forms';

export abstract class FormBaseViewModel<T> {

    public abstract form: FormGroup;

    public abstract toModel(): T;
}
