import { ChangeDetectionStrategy, Component, inject, Inject, Injector } from '@angular/core';
import { TuiDialogService } from "@taiga-ui/core";
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { AuthorizationService } from "../../../../services/authorization.service";
import { DestroyService } from "../../../../services/destroy.service";
import { IPath } from '../../interfaces/path.interface';
import { CurrentPathService } from '../../services/current-path.service';
import { imagePathRecord } from '../../types/image-path.type';
import { LoginComponent } from "../login/login.component";
import { RegistrationComponent } from "../registration/registration.component";

@Component({
    selector: 'cabinet-header',
    templateUrl: './cabinet-header.component.html',
    styleUrls: ['./styles/cabinet-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetHeaderComponent {

    public imagePathList: Record<string, string> = imagePathRecord;

    private authorizationService = inject(AuthorizationService);
    public paths$: BehaviorSubject<IPath[]> = this.authorizationService.paths$;
    readonly isLoggedIn$ = this.authorizationService.isLoggedIn$;

    constructor(
        @Inject(CurrentPathService) public currentPath$: Observable<string>,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
        readonly destroy$: DestroyService
    ) {
    }

    public openRegistration(): void {
        this.dialogs.open(new PolymorpheusComponent(RegistrationComponent, this.injector), { size: 'auto' }).pipe(
            takeUntil(this.destroy$)
        )
            .subscribe();
    }

    public openLogin(): void {
        this.dialogs.open(new PolymorpheusComponent(LoginComponent, this.injector), { size: 'auto' }).pipe(
            takeUntil(this.destroy$)
        )
            .subscribe();
    }
}
