import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICompany } from '../../children/dashboard/interfaces/company.interface';

@Component({
    selector: 'cabinet-footer',
    templateUrl: './cabinet-footer.component.html',
    styleUrls: ['./styles/cabinet-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetFooterComponent {
    private id = '4';
    // public contacts$: Observable<{ phone: string, email: string }> = inject(EditCompanyService)
    //     .getCompanyInfo(this.id)
    //     .pipe(
    //         map((data: ICompany) => {
    //             return {
    //                 phone: data.phone,
    //                 email: data.email
    //             }
    //         })
    //     );
}
