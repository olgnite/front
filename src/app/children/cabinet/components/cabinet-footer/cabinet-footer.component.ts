import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICompanyV2Request } from '../../children/dashboard/interfaces/company.interface';

@Component({
    selector: 'cabinet-footer',
    templateUrl: './cabinet-footer.component.html',
    styleUrls: ['./styles/cabinet-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetFooterComponent {
    @Input()
    public company!: ICompanyV2Request;
}
