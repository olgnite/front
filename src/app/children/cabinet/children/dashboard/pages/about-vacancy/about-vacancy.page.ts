import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DestroyService } from '../../../../../../services/destroy.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { tap, takeUntil } from 'rxjs';
import { CurrentPathService } from '../../../../services/current-path.service';

@Component({
    templateUrl: './about-vacancy.page.html',
    styleUrls: ['./styles/about-vacancy.page.scss'],
    providers: [
        DestroyService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutVacancyPage {

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
