import { RouterLinkActive, RouterModule, Routes } from "@angular/router"
import { LayoutDashboardPage } from "./pages/layout-dashboard/layout-dashboard.page"
import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"

const components: any[] = [
    LayoutDashboardPage,
]

const dashboardRoutes: Routes = [
    {
        path: '',
        component: LayoutDashboardPage,
        children: []
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
    ],
    providers: []
})
export class DashboardRoutingModule {

}
