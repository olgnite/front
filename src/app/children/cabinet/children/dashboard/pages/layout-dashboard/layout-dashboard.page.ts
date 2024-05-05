import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { DestroyService } from '../../../../../../services/destroy.service';
import { CurrentPathService } from '../../../../services/current-path.service';

@Component({
    templateUrl: './layout-dashboard.page.html',
    styleUrls: ['./styles/layout-dashboard.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: []
})
export class LayoutDashboardPage {

    private _destroy$: DestroyService = inject(DestroyService);
    private _currentPathService: CurrentPathService = inject(CurrentPathService);
    private _router: Router = inject(Router);

    constructor() {
        // todo: костыльно. Если будет длинный path, то сломается. Надо подумать
        this._router.events
            .pipe(
                tap(event => {
                    this._currentPathService.updatePath(event instanceof NavigationEnd
                        ? (event as NavigationEnd).url.split('/')[2]
                        : window.location.pathname.split('/')[2]);
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
