import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { HiringManagementComponent } from './pages/hiringManagement/hiring-management/hiring-management.component';
import { NoTokenFoundComponent } from './pages/errors/no-token-found/no-token-found.component';
import { RegisTokenGuard } from './guards/regisToken.guard';
import { NoPagesFoundComponent } from './pages/errors/no-pages-found/no-pages-found.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: NoPagesFoundComponent},
  { path: 'register/:email', component: RegisterComponent, canActivate:[RegisTokenGuard] },
  { path: 'personalInformation', component: PersonalInformationComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'hiringManagement', component: HiringManagementComponent },
  { path: 'noTokenFound', component: NoTokenFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
