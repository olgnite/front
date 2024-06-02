import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutCabinetPage } from './pages/layout-cabinet/layout-cabinet.page.';
import { URL_TOKEN } from "./children/dashboard/tokens/url.token";
import { AuthInterceptor } from '../../services/auth.interceptor';

const cabinetRoutes: Routes = [
    {
        path: '',
        component: LayoutCabinetPage,
        children: [
            {
                path: '',
                loadChildren: () => import('./children/dashboard/dashboard.routing-module').then((m: any) => m.DashboardRoutingModule)
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(cabinetRoutes),
        HttpClientModule,
    ],
    declarations: [
        LayoutCabinetPage,
    ],
    providers: [
        {
            provide: URL_TOKEN,
            useValue: 'http://158.160.153.165:8080'
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class CabinetRoutingModule {

}
