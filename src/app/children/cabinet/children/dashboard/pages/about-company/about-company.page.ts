import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { CurrentPathService } from '../../../../services/current-path.service';
import { DestroyService } from '../../../../../../services/destroy.service';
import { takeUntil, tap } from 'rxjs';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';
import { vacancies } from '../../../../consts/vacancies';

@Component({
    templateUrl: './about-company.page.html',
    styleUrls: ['./styles/about-company.page.scss'],
    providers: [
        DestroyService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutCompanyPage implements OnInit {

    public vacancyList: IVacancyCard[] = vacancies;

    private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private _currentPathService: CurrentPathService = inject(CurrentPathService);
    private _destroy$: DestroyService = inject(DestroyService);
    private _router: Router = inject(Router);

    public ngOnInit(): void {
        this._activatedRoute.url
            .pipe(
                tap((value: UrlSegment[]) => this._currentPathService.updatePath(value[0].path)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    public goToBack(): void {
        history.back();
    }

    public navigateToVacancies(): void {
        this._router.navigate(['/dashboard/vacancies/']);
    }
}
