import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';
import {AuthorizationService} from "../../../../../../services/authorization.service";

@Component({
    selector: 'vacancy',
    templateUrl: './vacancy.component.html',
    styleUrls: ['./styles/vacancy.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyComponent {
    @Input()
    public vacancy!: IVacancyCard;

    @Output()
    public showDialogRemove: EventEmitter<string> = new EventEmitter<string>();

    private authorizationService = inject(AuthorizationService);

    readonly isLoggedIn$ = this.authorizationService.isLoggedIn$;

    public removeEmit(id: string): void {
        this.showDialogRemove.emit(id);
    }
}
