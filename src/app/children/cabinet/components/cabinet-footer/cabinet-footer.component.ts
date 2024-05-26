import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICompany, ICompanyV2Request } from '../../children/dashboard/interfaces/company.interface';
import { RequestCompanyService } from '../../children/dashboard/services/request-company.service';
import { AUTHORIZED_COMPANY } from '../../children/dashboard/tokens/authorized-company.token';

@Component({
    selector: 'cabinet-footer',
    templateUrl: './cabinet-footer.component.html',
    styleUrls: ['./styles/cabinet-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetFooterComponent {
    private id = '4';
    public contacts$: Observable<any> = inject(AUTHORIZED_COMPANY);
}
