import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { tap, takeUntil } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { CurrentPathService } from '../../../../services/current-path.service';

@Component({
    templateUrl: './vacancy-list.page.html',
    styleUrls: ['./styles/vacancy-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacancyListPage implements OnInit {

    private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private _currentPathService: CurrentPathService = inject(CurrentPathService);
    private _destroy$: DestroyService = inject(DestroyService);

    public ngOnInit(): void {
        // TODO сделать универсально
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
