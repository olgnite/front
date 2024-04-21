import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'company',
    templateUrl: './company.component.html',
    styleUrls: ['./styles/company.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent {

}
