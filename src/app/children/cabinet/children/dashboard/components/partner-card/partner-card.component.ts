import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICompanyV2Request } from '../../interfaces/company.interface';

@Component({
    selector: 'partner',
    templateUrl: './partner-card.component.html',
    styleUrls: ['./styles/partner-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerCardComponent {

    @Input()
    public partnerCard!: ICompanyV2Request;
}
