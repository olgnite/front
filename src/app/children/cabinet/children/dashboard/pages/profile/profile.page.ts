import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { ProfileViewModel } from '../../view-model/profile.view-model';
import { BehaviorSubject, Observable, takeUntil, tap } from 'rxjs';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { DestroyService } from '../../../../../../services/destroy.service';
import { AuthorizationService } from '../../../../../../services/authorization.service';
import { ICompanyV2Request } from '../../interfaces/company.interface';
import { AUTHORIZED_COMPANY } from '../../tokens/authorized-company.token';
import { ChangePasswordViewModel } from '../../view-model/change-password.view-model';
import { RequestCompanyService } from '../../services/request-company.service';

@Component({
    templateUrl: './profile.page.html',
    styleUrls: ['./styles/profile.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage {

    public profileViewModel!: ProfileViewModel;
    public changePasswordViewModel: ChangePasswordViewModel = new ChangePasswordViewModel();
    public isEditData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public companyData$: BehaviorSubject<ICompanyV2Request | null> = new BehaviorSubject<ICompanyV2Request | null>(null);
    public company$!: Observable<ICompanyV2Request>;

    private authorizationService = inject(AuthorizationService);
    private requestCompanyService = inject(RequestCompanyService);
    readonly isLoggedIn$ = this.authorizationService.isLoggedIn$;

    constructor(
        @Inject(TuiDialogService) public readonly dialogs: TuiDialogService,
        @Inject(DestroyService) public readonly destroy$: DestroyService,
        @Inject(AUTHORIZED_COMPANY) private _authorizedCompany: Observable<ICompanyV2Request>
    ) {
        this.company$ = this._authorizedCompany
            .pipe(
                tap((data: ICompanyV2Request) => {
                    this.companyData$.next(data);
                    this.profileViewModel = new ProfileViewModel(data);
                })
            );
    }

    public editMode(flag: boolean): void {
        this.isEditData$.next(flag);
    }

    public onSubmit(): void {
        const dto: { name: string, email: string; } = this.profileViewModel.toModel();
        console.log(this.companyData$.value);
        this.requestCompanyService.updateCompany({ ...this.companyData$.value, company_name: dto.name, email: dto.email })
            .pipe(
                tap(() => this.isEditData$.next(false)),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public openChangePasswordDialog(template: PolymorpheusContent<TuiDialogContext>): void {
        this.dialogs.open(template)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public logout(): void {
        this.authorizationService.logout();
    }

    public changePassword(model: ChangePasswordViewModel, observer: any): void {
        this.authorizationService.changePassword({ password: model.toModel().currentPassword, new_password: model.toModel().newPassword })
            .pipe(
                tap(() => observer.complete()),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public goToBack(): void {
        history.back();
    }
}
