import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app/app.component';
import {DestroyService} from './services/destroy.service';
import {environment} from "../environments/environment.development";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        AngularFireDatabaseModule
    ],
    providers: [
        DestroyService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
