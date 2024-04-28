import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { tap, takeUntil } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { CurrentPathService } from '../../../../services/current-path.service';
import { IVacancyCard } from '../../../../interfaces/vacancy-card.interface';
import { vacancies } from '../../../../consts/vacancies';

@Component({
    templateUrl: './vacancy-list.page.html',
    styleUrls: ['./styles/vacancy-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyListPage implements OnInit {

    public name: string = '';
    public vacancyList: IVacancyCard[] = vacancies;

    private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private _currentPathService: CurrentPathService = inject(CurrentPathService);
    private _destroy$: DestroyService = inject(DestroyService);

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
}
