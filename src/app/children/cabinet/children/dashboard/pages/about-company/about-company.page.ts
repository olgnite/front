import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './about-company.page.html',
    styleUrls: ['./styles/about-company.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutCompanyPage {

    public goToBack(): void {
        history.back();
    }
}
