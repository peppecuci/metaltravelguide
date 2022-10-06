import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { SecurityModule } from "./core/security/security.module";
import { AppComponent } from './app.component';
import { HeaderComponent } from "./core/components/header/header.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { HomeComponent } from './core/pages/home/home.component';
import { PrivacyComponent } from './core/pages/privacy/privacy.component';
import { ContactComponent } from './core/pages/contact/contact.component';
import { ProfileComponent } from "./core/pages/profile/profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PrivacyComponent,
    ContactComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SecurityModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      easing: 'ease-in',
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      tapToDismiss: true,
      newestOnTop: true
    })
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
