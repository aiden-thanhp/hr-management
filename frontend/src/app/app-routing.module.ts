import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PersonalInformationComponent } from './pages/personal-information/personal-information.component';
import { HiringManagementComponent } from './pages/hiringManagement/hiring-management.component';
import { NoTokenFoundComponent } from './pages/errors/no-token-found/no-token-found.component';
import { RegisTokenGuard } from './guards/regisToken.guard';
import { NoPagesFoundComponent } from './pages/errors/no-pages-found/no-pages-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthEmployeesGuard } from './guards/auth-employees.guard';
import { AuthHRGuard } from './guards/auth-hr.guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { EmployeesProfileComponent } from './pages/employees-profile/employees-profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: NoPagesFoundComponent },
  {
    path: 'register/:email',
    component: RegisterComponent,
    canActivate: [RegisTokenGuard],
  },
  {
    path: 'personalInformation',
    component: PersonalInformationComponent,
    canActivate: [AuthGuard, AuthEmployeesGuard],
  },
  {
    path: 'onboarding',
    component: OnboardingComponent,
    canActivate: [AuthGuard, AuthEmployeesGuard],
  },
  {
    path: 'hiringManagement',
    component: HiringManagementComponent,
    canActivate: [AuthGuard, AuthHRGuard],
  },
  {
    path: 'hiringManagement',
    component: HiringManagementComponent,
    canActivate: [AuthGuard, AuthHRGuard],
  },
  { path: 'noTokenFound', component: NoTokenFoundComponent },

  {
    path: 'profile/:profileId',
    component: ProfilePageComponent,
    canActivate: [AuthGuard, AuthHRGuard],
  },
  {
    path: 'employeesProfiles',
    component: EmployeesProfileComponent,
    canActivate: [AuthGuard, AuthHRGuard],
  },
  { path: '**', component: NoPagesFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
