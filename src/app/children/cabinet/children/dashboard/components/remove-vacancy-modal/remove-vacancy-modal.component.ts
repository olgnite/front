import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { take, tap } from 'rxjs';
import { UiCampusButtonComponent } from '../../../../../../ui';
import { RequestVacancyService } from '../../services/request-vacancy.service';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';

@Component({
    standalone: true,
    templateUrl: './remove-vacancy-modal.component.html',
    styleUrls: ['./styles/remove-vacancy-modal.component.scss'],
    imports: [
        UiCampusButtonComponent,
        CommonModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveVacancyModalComponent {

    public vacancy: IVacancyCard;

    constructor(
        @Inject(POLYMORPHEUS_CONTEXT) public readonly context: TuiDialogContext,
        @Inject(RequestVacancyService) private readonly _requestVacancyService: RequestVacancyService,
    ) {
        this.vacancy = (context.data as any).vacancy;
    }

    public removeVacancyById(): void {
        this._requestVacancyService.removeVacancyById(this.vacancy.id!)
            .pipe(
                tap(() => {
                    (this.context.data as any).update$.next();
                    this.context.$implicit.complete();
                }),
                take(1)
            )
            .subscribe()
    }

    public cancel(): void {
        this.context.$implicit.complete();
    }
}
