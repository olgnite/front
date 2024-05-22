import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './partner-list.page.html',
    styleUrls: ['./styles/partner-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerListPage {

    public name: string = '';

    public goToBack(): void {
        history.back();
    }
}
