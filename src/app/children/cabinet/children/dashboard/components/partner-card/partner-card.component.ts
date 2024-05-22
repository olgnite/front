import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'partner',
    templateUrl: './partner-card.component.html',
    styleUrls: ['./styles/partner-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerCardComponent {

    @Input()
    public partnerCard: any;
}
