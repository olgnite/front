import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {EditCompanyService} from "../../services/edit-company.service";
import {ICompany} from "../../interfaces/company.interface";
import {Observable} from "rxjs";
import {AuthorizationService} from "../../../../../../services/authorization.service";

@Component({
    selector: 'company',
    templateUrl: './company.component.html',
    styleUrls: ['./styles/company.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent implements OnInit{
    private editService: EditCompanyService = inject(EditCompanyService);
    private id ='4';
    public company$!: Observable<ICompany>;
    private authorizationService = inject(AuthorizationService);

    isLoggedIn$ = this.authorizationService.isLoggedIn$;

    ngOnInit(): void {
        this.company$ = this.editService.getCompanyInfo(this.id);
    }
}
