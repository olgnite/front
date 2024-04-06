import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundPage } from "./pages/not-found.page";
import { NgModule } from "@angular/core";

const components: any[] = [
    NotFoundPage
];

const routes: Routes = [
    {
        path: '',
        component: NotFoundPage
    },
];

@NgModule({
    declarations: [
        components
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    providers: []
})
export class NotFoundRoutingModule {

}
