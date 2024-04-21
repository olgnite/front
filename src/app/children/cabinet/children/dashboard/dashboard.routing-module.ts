import { RouterLinkActive, RouterModule, Routes } from "@angular/router"
import { LayoutDashboardPage } from "./pages/layout-dashboard/layout-dashboard.page"
import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { CabinetHeaderComponent } from "../../components/cabinet-header/cabinet-header.component"
import { UiCampusButtonComponent } from '../../../../ui'
import { AboutCompanyPage } from './pages/about-company/about-company.page'
import { CompanyComponent } from './components/company/company.component'
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component'
import { VacanciesComponent } from './components/vacancies/vacancies.component'
import { CabinetFooterComponent } from '../../components/cabinet-footer/cabinet-footer.component'

const components: any[] = [
    LayoutDashboardPage,
    CabinetHeaderComponent,
    CabinetFooterComponent,
    AboutCompanyPage,
    CompanyComponent,
    PhotoGalleryComponent,
    VacanciesComponent
];

const dashboardRoutes: Routes = [
    {
        path: '',
        component: LayoutDashboardPage,
        children: [
            {
                path: '',
                redirectTo: 'abount-company',
                pathMatch: 'full'
            },
            {
                path: 'abount-company',
                component: AboutCompanyPage
            }
        ]
    }
]

@NgModule({
    declarations: [
        components,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(dashboardRoutes),
        RouterLinkActive,
        ReactiveFormsModule,
        UiCampusButtonComponent,
    ],
    providers: []
})
export class DashboardRoutingModule {

}
