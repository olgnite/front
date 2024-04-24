import { RouterLinkActive, RouterModule, Routes } from '@angular/router'
import { LayoutDashboardPage } from './pages/layout-dashboard/layout-dashboard.page'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CabinetHeaderComponent } from '../../components/cabinet-header/cabinet-header.component'
import { UiCampusButtonComponent } from '../../../../ui'
import { AboutCompanyPage } from './pages/about-company/about-company.page'
import { CompanyComponent } from './components/company/company.component'
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component'
import { VacanciesComponent } from './components/vacancies/vacancies.component'
import { CabinetFooterComponent } from '../../components/cabinet-footer/cabinet-footer.component'
import { VacancyCardComponent } from './components/vacancy-card/vacancy-card.component'
import { VacancyListPage } from './pages/vacancy-list/vacancy-list.page'
import { EditCompanyComponent } from './components/edit-company/edit-company.component'
import { MoreVacancyPage } from './pages/more-vacancy/more-vacancy.page'

const components: any[] = [
    LayoutDashboardPage,
    CabinetHeaderComponent,
    CabinetFooterComponent,
    AboutCompanyPage,
    CompanyComponent,
    PhotoGalleryComponent,
    VacanciesComponent,
    VacancyCardComponent,
    VacancyListPage,
    EditCompanyComponent
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
            },
            {
                path: 'vacancies',
                component: VacancyListPage
            },
            {
                path: 'more-vacancy',
                component: MoreVacancyPage
            }
        ]
    }
];

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
