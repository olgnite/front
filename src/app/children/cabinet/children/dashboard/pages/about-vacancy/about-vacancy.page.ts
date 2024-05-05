import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DestroyService } from '../../../../../../services/destroy.service';

@Component({
    templateUrl: './about-vacancy.page.html',
    styleUrls: ['./styles/about-vacancy.page.scss'],
    providers: [
        DestroyService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutVacancyPage {

    public goToBack(): void {
        history.back();
    }
}
