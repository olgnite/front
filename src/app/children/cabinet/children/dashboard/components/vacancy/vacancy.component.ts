import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';
import { AuthorizationService } from "../../../../../../services/authorization.service";
import { RequestCompanyService } from '../../services/request-company.service';
import { map, Observable } from 'rxjs';
import { ICompanyV2 } from '../../interfaces/company.interface';

@Component({
    selector: 'vacancy',
    templateUrl: './vacancy.component.html',
    styleUrls: ['./styles/vacancy.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyComponent implements OnInit {
    @Input()
    public vacancy!: IVacancyCard;

    @Output()
    public showDialogRemove: EventEmitter<string> = new EventEmitter<string>();

    public company$?: Observable<ICompanyV2>;

    private authorizationService = inject(AuthorizationService);
    private requestCompanyService: RequestCompanyService = inject(RequestCompanyService);
    readonly isLoggedIn$ = this.authorizationService.isLoggedIn$;

    public ngOnInit(): void {
        // this.company$ = this.requestCompanyService.getCompanyById(this.vacancy.companyId || '')
        //     .pipe(
        //         map(value => ({
        //             companyName: value.company_name,
        //             personalSite: value.personal_site,
        //             ...value
        //         }))
        //     );
    }

    public removeEmit(id: string): void {
        this.showDialogRemove.emit(id);
    }
}
