import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RequestCompanyService } from '../../services/request-company.service';
import { Observable } from 'rxjs';
import { ICompanyV2Request } from '../../interfaces/company.interface';

@Component({
    templateUrl: './partner-list.page.html',
    styleUrls: ['./styles/partner-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerListPage {

    public name: string = '';
    public parthers$!: Observable<ICompanyV2Request[]>;

    public requestCompanyService: RequestCompanyService = inject(RequestCompanyService);

    constructor() {
        this.parthers$ = this.requestCompanyService.getCompanies();
    }

    public goToBack(): void {
        history.back();
    }
}
