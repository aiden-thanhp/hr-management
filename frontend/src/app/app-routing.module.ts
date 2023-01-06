import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { AuthGuard } from './services/auth.guard';
import { AuthEmployeesGuard } from './services/auth-employees.guard';
import { AuthHRGuard } from './services/auth-hr.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'personalInformation',
    component: PersonalInformationComponent,
    canActivate: [AuthGuard, AuthEmployeesGuard],
  },
  { path: 'onboarding', component: OnboardingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
