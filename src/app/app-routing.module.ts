import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetRoutingModule } from './children/cabinet/cabinet.routing-module';
import { NotFoundRoutingModule } from './children/not-found/not-found.routing-module';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./children/cabinet/cabinet.routing-module').then((m: any) => m.CabinetRoutingModule)
    },
    {
        path: '**',
        loadChildren: () => import('./children/not-found/not-found.routing-module').then((m: any) => m.NotFoundRoutingModule)
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CabinetRoutingModule,
    NotFoundRoutingModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
