import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';
import { RequestVacancyService } from '../../services/request-vacancy.service';
import { RequestCompanyService } from '../../services/request-company.service';
import { ICompanyV2Request } from '../../interfaces/company.interface';

@Component({
    templateUrl: './about-company.page.html',
    styleUrls: ['./styles/about-company.page.scss'],
    providers: [
        DestroyService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutCompanyPage {

    public vacancyList$?: Observable<IVacancyCard[]>;
    public company$!: Observable<ICompanyV2Request>;
    public isShowAll$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _requestVacancyService: RequestVacancyService = inject(RequestVacancyService);
    private _requestCompanyService: RequestCompanyService = inject(RequestCompanyService);

    constructor() {
        this.vacancyList$ = this._requestVacancyService.getVacancyList();
        this.company$ = this._requestCompanyService.getCompanyById('ff74a67a-9ad8-4d3a-b554-1cbe2d91cb28');
    }

    public updateShowVacancies(flag: boolean): void {
        this.isShowAll$.next(flag);
    }

    public goToBack(): void {
        history.back();
    }
}
