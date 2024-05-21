import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AuthorizationService} from "../services/authorization.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    private authorizationService = inject(AuthorizationService);
    ngOnInit(): void {
        this.authorizationService.isTokenValid();
    }
}
