import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {EditCompanyService} from "../../services/edit-company.service";
import {ICompany} from "../../interfaces/company.interface";
import {Observable} from "rxjs";

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

    ngOnInit(): void {
        this.company$ = this.editService.getCompanyInfo(this.id);
    }
}
