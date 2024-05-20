import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutCabinetPage } from './pages/layout-cabinet/layout-cabinet.page.';
import {URL_TOKEN} from "./children/dashboard/tokens/url.token";

const cabinetRoutes: Routes = [
    {
        path: '',
        component: LayoutCabinetPage,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./children/dashboard/dashboard.routing-module').then((m: any) => m.DashboardRoutingModule)
            }
        ]
    }
]

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
            useValue: 'https://vacancies-service.onrender.com'
        }
    ]
})
export class CabinetRoutingModule {

}
