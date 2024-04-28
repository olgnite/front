import { RouterLinkActive, RouterModule, Routes } from '@angular/router'
import { LayoutDashboardPage } from './pages/layout-dashboard/layout-dashboard.page'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CabinetHeaderComponent } from '../../components/cabinet-header/cabinet-header.component'
import { UiCampusButtonComponent } from '../../../../ui'
import { AboutCompanyPage } from './pages/about-company/about-company.page'
import { CompanyComponent } from './components/company/company.component'
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component'
import { CabinetFooterComponent } from '../../components/cabinet-footer/cabinet-footer.component'
import { VacancyCardComponent } from './components/vacancy-card/vacancy-card.component'
import { VacancyListPage } from './pages/vacancy-list/vacancy-list.page'
import { MoreVacancyPage } from './pages/more-vacancy/more-vacancy.page'
import { CurrentPathService } from '../../services/current-path.service'
import { SearchPipe } from '../../pipes/search.pipe'
import { EditCompanyPage } from './pages/edit-company/edit-company.page'

const components: any[] = [
    LayoutDashboardPage,
    CabinetHeaderComponent,
    CabinetFooterComponent,
    AboutCompanyPage,
    CompanyComponent,
    PhotoGalleryComponent,
    VacancyCardComponent,
    VacancyListPage,
    EditCompanyPage
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
                path: 'edit-company',
                component: EditCompanyPage
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
        ...components,
        SearchPipe
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(dashboardRoutes),
        RouterLinkActive,
        ReactiveFormsModule,
        FormsModule,
        UiCampusButtonComponent,
    ],
    providers: [
        CurrentPathService
    ]
})
export class DashboardRoutingModule {

}
