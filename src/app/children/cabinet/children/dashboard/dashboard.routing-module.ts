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
import { AboutVacancyPage } from './pages/about-vacancy/about-vacancy.page'
import { VacancyComponent } from './components/vacancy/vacancy.component'
import { EditVacancyPage } from './pages/edit-vacancy/edit-vacancy.page'
import { URL_TOKEN } from './tokens/url.token'
import { RequestVacancyService } from './services/request-vacancy.service'
import { ProfilePage } from './pages/profile/profile.page'
import { RequestPhotoGalleryService } from './services/request-photogallery.service'
import {TokenValidateGuard} from "./guards/token-validate.guard";

const components: any[] = [
    LayoutDashboardPage,
    CabinetHeaderComponent,
    CabinetFooterComponent,
    AboutCompanyPage,
    CompanyComponent,
    PhotoGalleryComponent,
    VacancyCardComponent,
    VacancyListPage,
    EditCompanyPage,
    AboutVacancyPage,
    VacancyComponent,
    EditVacancyPage,
    ProfilePage
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
                path: 'about-company',
                component: AboutCompanyPage
            },
            {
                path: 'edit-company',
                component: EditCompanyPage,
                canActivate: [TokenValidateGuard]
            },
            {
                path: 'vacancies',
                component: VacancyListPage
            },
            {
                path: 'vacancies/:id',
                component: AboutVacancyPage
            },
            {
                path: 'edit-vacancy/:id',
                component: EditVacancyPage,
                canActivate: [TokenValidateGuard]
            },
            {
                path: 'more-vacancy',
                component: MoreVacancyPage
            },
            {
                path: 'profile',
                component: ProfilePage
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
        CurrentPathService,
        RequestVacancyService,
        RequestPhotoGalleryService,
        {
            provide: URL_TOKEN,
            useValue: 'https://vacancies-service.onrender.com'
        }
    ]
})
export class DashboardRoutingModule {

}
