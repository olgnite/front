import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { EditCompanyService } from '../../children/dashboard/services/edit-company.service';
import { Observable, map, tap } from 'rxjs';
import { ICompany } from '../../children/dashboard/interfaces/company.interface';

@Component({
    selector: 'cabinet-footer',
    templateUrl: './cabinet-footer.component.html',
    styleUrls: ['./styles/cabinet-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetFooterComponent implements OnInit {
    private editService: EditCompanyService = inject(EditCompanyService);
    private id = '4';
    public contacts$!: Observable<{ phone: string, email: string }>;

    public ngOnInit(): void {
        this.contacts$ = this.editService.getCompanyInfo(this.id)
            .pipe(
                tap(data => console.log(data)),
                map((data: ICompany) => {
                    return {
                        phone: data.phone,
                        email: data.email
                    }
                })
            );
    }
}
