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
import { AuthorizationService } from "../../../../services/authorization.service";
import { IRegistration, IRegistrationResponse } from "../../interfaces/authorization.interface";
import { getErrorMessages } from '../../../../utils/get-error-messages';


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
    private authorizationService = inject(AuthorizationService);
    inn = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]);
    registrationForm!: FormGroup;
    nextStep: boolean = false;

    public confirmPasswordValidator(formGroup: FormGroup) {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;

        if (password !== confirmPassword) {
            return { passwordsMismatch: true };
        }

        return null;
    }

    constructor(
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
        readonly destroy$: DestroyService
    ) {
    }

    public ngOnInit(): void {
        this.registrationForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]],
            companyName: ['', Validators.required],
            agreeToTerms: [false, [Validators.requiredTrue]]
        }, {
            validators: [this.confirmPasswordValidator]
        });
    }

    public register() {
        const data: IRegistration = {
            ...this.registrationForm.value,
            inn: this.inn.value,
            company_name: this.registrationForm.value.companyName
        };

        this.authorizationService.registration(data)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe((response: IRegistrationResponse) =>
                alert(`Пользователь ${response.email} успешно зарегистрирован!`),
                () =>
                    alert('Возникла ошибка!')
            );
        this.context.completeWith();
    }

    public validateINN() {
        console.log(this.inn.value);
        this.nextStep = true;
    }

    public validationElementMethod(controlName: string): boolean {
        return !!(this.registrationForm.get(controlName)?.invalid && this.registrationForm.get(controlName)?.touched);
    }

    public getErrorMessages<T, R extends T>(control: AbstractControl<T, R>): string[] {
        return getErrorMessages(control);
    }

    public openLogin(): void {
        this.dialogs.open(new PolymorpheusComponent(LoginComponent, this.injector), { size: 'auto' }).pipe(
            takeUntil(this.destroy$)
        ).subscribe();
        this.context.completeWith();
    }
}
