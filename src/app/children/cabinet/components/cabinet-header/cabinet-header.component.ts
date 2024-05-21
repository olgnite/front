import {ChangeDetectionStrategy, Component, inject, Inject, Injector} from '@angular/core';
import {Observable, takeUntil} from 'rxjs';
import { paths } from '../../consts/paths';
import { IPath } from '../../interfaces/path.interface';
import { CurrentPathService } from '../../services/current-path.service';
import { imagePathRecord } from '../../types/image-path.type';
import {TuiDialogService} from "@taiga-ui/core";
import {RegistrationComponent} from "../registration/registration.component";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {DestroyService} from "../../../../services/destroy.service";
import {LoginComponent} from "../login/login.component";
import {AuthorizationService} from "../../../../services/authorization.service";

@Component({
    selector: 'cabinet-header',
    templateUrl: './cabinet-header.component.html',
    styleUrls: ['./styles/cabinet-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetHeaderComponent {

    public paths: IPath[] = paths;
    public imagePathList: Record<string, string> = imagePathRecord;

    private authorizationService = inject(AuthorizationService);

    readonly isLoggedIn$ = this.authorizationService.isLoggedIn$;

    constructor(@Inject(CurrentPathService) public currentPath$: Observable<string>,
                @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector,
                readonly destroy$: DestroyService) {
    }

    openRegistration(): void {
        this.dialogs.open(new PolymorpheusComponent(RegistrationComponent, this.injector), {size: 'auto'}).pipe(
            takeUntil(this.destroy$)
        ).subscribe();
    }

    openLogin(): void {
        this.dialogs.open(new PolymorpheusComponent(LoginComponent, this.injector), {size: 'auto'}).pipe(
            takeUntil(this.destroy$)
        ).subscribe();
    }

    logout(): void {
        this.authorizationService.logout();
    }
}
