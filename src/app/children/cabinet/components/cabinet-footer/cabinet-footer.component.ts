import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICompany, ICompanyV2Request } from '../../children/dashboard/interfaces/company.interface';
import { RequestCompanyService } from '../../children/dashboard/services/request-company.service';

@Component({
    selector: 'cabinet-footer',
    templateUrl: './cabinet-footer.component.html',
    styleUrls: ['./styles/cabinet-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetFooterComponent {
    private id = '4';
    public contacts$: Observable<any> = inject(RequestCompanyService)
        .getCompanyById('ff74a67a-9ad8-4d3a-b554-1cbe2d91cb28')
        .pipe(
            map((data: ICompanyV2Request) => {
                return {
                    phone: data.phone,
                    email: data.email
                }
            })
        );
}
