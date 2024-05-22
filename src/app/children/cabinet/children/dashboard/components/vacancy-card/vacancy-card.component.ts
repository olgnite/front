import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';
import { AuthorizationService } from '../../../../../../services/authorization.service';

@Component({
    selector: 'vacancy-card',
    templateUrl: './vacancy-card.component.html',
    styleUrls: ['./styles/vacancy-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyCardComponent {

    @Input()
    public vacancyCard!: IVacancyCard;

    @Output()
    public showDialogRemove: EventEmitter<void> = new EventEmitter<void>();

    private authorizationService = inject(AuthorizationService);
    readonly isLoggedIn$ = this.authorizationService.isLoggedIn$;

    public removeEmit(): void {
        this.showDialogRemove.emit();
    }
}
