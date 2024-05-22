import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { ProfileViewModel } from '../../view-model/profile.view-model';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { DestroyService } from '../../../../../../services/destroy.service';
import { AuthorizationService } from '../../../../../../services/authorization.service';

@Component({
    templateUrl: './profile.page.html',
    styleUrls: ['./styles/profile.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage {
    public profileViewModel: ProfileViewModel = new ProfileViewModel();
    public isEditData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private authorizationService = inject(AuthorizationService);
    readonly isLoggedIn$ = this.authorizationService.isLoggedIn$;

    constructor(
        @Inject(TuiDialogService) public readonly dialogs: TuiDialogService,
        @Inject(DestroyService) public readonly destroy$: DestroyService
    ) {
    }

    public editMode(flag: boolean): void {
        this.isEditData$.next(flag);
    }

    public onSubmit(): void {
        console.log(this.profileViewModel.toModel());
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

    public changePassword(): void {

    }

    public goToBack(): void {
        history.back();
    }
}
