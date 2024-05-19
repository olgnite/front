import { ChangeDetectionStrategy, Component, inject, Inject, Injector, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { TuiDialogContext, TuiDialogService } from "@taiga-ui/core";
import { POLYMORPHEUS_CONTEXT, PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UiCampusButtonComponent } from "../../../../ui";
import { LoginComponent } from "../login/login.component";
import { takeUntil } from "rxjs";
import { DestroyService } from "../../../../services/destroy.service";


@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./styles/registration.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule,
        NgClass,
        NgIf,
        UiCampusButtonComponent,
        ReactiveFormsModule,
        NgForOf
    ],
    standalone: true
})
export class RegistrationComponent implements OnInit {
    private formBuilder: FormBuilder = inject(FormBuilder);
    inn = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]);
    registrationForm!: FormGroup;
    nextStep: boolean = false;

    private errors: Record<string, string> = {
        required: 'Это поле обязательно',
        minlength: 'Минимальная длина 8 символов',
        pattern: 'Поле не валидно',
        email: 'Неверный формат почты'
    };

    confirmPasswordValidator(formGroup: FormGroup) {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;

        if (password !== confirmPassword) {
            return { passwordsMismatch: true };
        }

        return null;
    }

    constructor(@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
        readonly destroy$: DestroyService) {
    }

    ngOnInit(): void {
        this.registrationForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]],
            agreeToTerms: [false, [Validators.requiredTrue]]
        }, {
            validators: [this.confirmPasswordValidator]
        });
    }

    register() {
        console.log(this.registrationForm.value);
        this.context.completeWith();
    }

    validateINN() {
        console.log(this.inn.value);
        this.nextStep = true;
    }

    validationElementMethod(controlName: string): boolean {
        return !!(this.registrationForm.get(controlName)?.invalid && this.registrationForm.get(controlName)?.touched);
    }

    getErrorMessages<T>(control: AbstractControl<T>): string[] {
        const messages: string[] = [];
        if (control.errors) {
            for (const errorName in control.errors) {
                const mesValue: string = this.errors[errorName] || 'Ввод не валиден';
                messages.push(mesValue);
            }
        }

        return messages;
    }

    openLogin(): void {
        this.dialogs.open(new PolymorpheusComponent(LoginComponent, this.injector), { size: 'auto' }).pipe(
            takeUntil(this.destroy$)
        ).subscribe();
        this.context.completeWith();
    }
}
