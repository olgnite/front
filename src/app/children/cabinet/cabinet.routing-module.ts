import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutCabinetPage } from './pages/layout-cabinet/layout-cabinet.page.';
import { HttpClientModule } from '@angular/common/http';
import { UiCampusButtonComponent } from '../../ui';
import { CabinetHeaderComponent } from './components/cabinet-header/cabinet-header.component';

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
    providers: []
})
export class CabinetRoutingModule {

}
