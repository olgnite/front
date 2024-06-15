import { RouterLinkActive, RouterModule, Routes } from '@angular/router';
import { LayoutDashboardPage } from './pages/layout-dashboard/layout-dashboard.page';
import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CabinetHeaderComponent } from '../../components/cabinet-header/cabinet-header.component';
import { UiCampusButtonComponent } from '../../../../ui';
import { AboutCompanyPage } from './pages/about-company/about-company.page';
import { CompanyComponent } from './components/company/company.component';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { CabinetFooterComponent } from '../../components/cabinet-footer/cabinet-footer.component';
import { VacancyCardComponent } from './components/vacancy-card/vacancy-card.component';
import { VacancyListPage } from './pages/vacancy-list/vacancy-list.page';
import { CurrentPathService } from '../../services/current-path.service';
import { SearchPipe } from '../../pipes/search.pipe';
import { EditCompanyPage } from './pages/edit-company/edit-company.page';
import { AboutVacancyPage } from './pages/about-vacancy/about-vacancy.page';
import { VacancyComponent } from './components/vacancy/vacancy.component';
import { EditVacancyPage } from './pages/edit-vacancy/edit-vacancy.page';
import { RequestVacancyService } from './services/request-vacancy.service';
import { ProfilePage } from './pages/profile/profile.page';
import { RequestPhotoGalleryService } from './services/request-photogallery.service';
import { TokenValidateGuard } from "./guards/token-validate.guard";
import { PartnerListPage } from './pages/partner-list/partner-list.page';
import { PartnerCardComponent } from './components/partner-card/partner-card.component';
import { RequestCompanyService } from './services/request-company.service';
import { AUTHORIZED_COMPANY } from './tokens/authorized-company.token';
import { Observable, map, of, switchMap } from 'rxjs';
import { ICompanyV2Request } from './interfaces/company.interface';
import { SearchPartnersPipe } from '../../pipes/serach-partners.pipe';
import { CacheRequestService } from './services/cache-request.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestAnimateComponent } from './components/test-animate/test-animate.component';
import { BrowserModule } from '@angular/platform-browser';

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
    ProfilePage,
    PartnerListPage,
    PartnerCardComponent,
    TestAnimateComponent
];

const dashboardRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard/about-company'
    },
    {
        path: 'dashboard',
        component: LayoutDashboardPage,
        children: [
            {
                path: '',
                redirectTo: 'about-company',
                pathMatch: 'full'
            },
            {
                path: 'about-company',
                component: AboutCompanyPage,
                canActivate: [TokenValidateGuard]
            },
            {
                path: 'partner/:id',
                component: AboutCompanyPage,
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
                path: 'profile',
                component: ProfilePage,
                canActivate: [TokenValidateGuard]
            },
            {
                path: 'partners',
                component: PartnerListPage,
            },
            {
                path: 'test-animate',
                component: TestAnimateComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        ...components,
        SearchPipe,
        SearchPartnersPipe
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
        RequestCompanyService,
        CacheRequestService,
        {
            provide: AUTHORIZED_COMPANY,
            useFactory: (): Observable<ICompanyV2Request> => {
                const requestCompanyService: RequestCompanyService = inject(RequestCompanyService);

                return requestCompanyService.getCompanies()
                    .pipe(
                        map((data: ICompanyV2Request[]) => {
                            return (data.find((item: ICompanyV2Request) => item.email === localStorage.getItem('email')) || {} as ICompanyV2Request)?.id || '';
                        }),
                        switchMap((id: string) => requestCompanyService.getCompanyById(id))
                    );
            }
        }
    ]
})
export class DashboardRoutingModule {

}
