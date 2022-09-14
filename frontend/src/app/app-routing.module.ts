import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from "./core/security/components/register/register.component";
import { LoginComponent } from "./core/security/components/login/login.component";
import { HomeComponent } from "./core/pages/home/home.component";
import { PrivacyComponent } from "./core/pages/privacy/privacy.component";
import { ContactComponent } from "./core/pages/contact/contact.component";
import { ProfileComponent } from "./core/pages/profile/profile.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'places', loadChildren: () => import("./features/places/places.module").then(m => m.PlacesModule) },
  { path: 'users', loadChildren: () => import("./features/users/users.module").then(m => m.UsersModule) },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
