import { ChangeDetectionStrategy, Component, inject, Inject, Injector, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { TuiDialogContext, TuiDialogService } from "@taiga-ui/core";
import { POLYMORPHEUS_CONTEXT, PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UiCampusButtonComponent } from "../../../../ui";
import { DestroyService } from "../../../../services/destroy.service";
import { takeUntil } from "rxjs";
import { RegistrationComponent } from "../registration/registration.component";
import { AuthorizationService } from "../../../../services/authorization.service";
import { ILogin } from "../../interfaces/authorization.interface";
import { Router } from '@angular/router';
import { pathsAuth } from '../../consts/paths';


@Component({
    selector: 'registration',
    templateUrl: './login.component.html',
    styleUrls: ['./styles/login.component.scss'],
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
export class LoginComponent implements OnInit {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private authorizationService = inject(AuthorizationService);
    private router: Router = inject(Router);
    loginForm!: FormGroup;

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
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    login() {
        const data: ILogin = { username: this.loginForm.value.email, password: this.loginForm.value.password };

        this.authorizationService.login(data).pipe(takeUntil(this.destroy$)).subscribe(
            response => {
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('email', data.username);
                this.authorizationService.isTokenValid();
                alert(`Вы успешно вошли!`);
                this.router.navigate(['/dashboard/about-company']);
                this.authorizationService.paths$.next(pathsAuth);
            },
            () => alert('Возникла ошибка!')
        );
        this.context.completeWith();
    }

    validationElementMethod(controlName: string): boolean {
        return !!(this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched);
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

    openRegistration(): void {
        this.dialogs.open(new PolymorpheusComponent(RegistrationComponent, this.injector), { size: 'auto' }).pipe(
            takeUntil(this.destroy$)
        ).subscribe();
        this.context.completeWith();
    }
}
