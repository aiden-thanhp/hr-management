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
import { HousingComponent } from './pages/housing/housing.component';
import { ReportComponent } from './pages/report/report.component';
import { HousingManagementComponent } from './pages/housing-management/housing-management.component';
import { HouseSummaryComponent } from './pages/house-summary/house-summary.component';
import { ReportHRComponent } from './pages/report-hr/report-hr.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { EmployeesProfileComponent } from './pages/employees-profile/employees-profile.component';
import { VisaStatusManagementComponent } from './pages/visa-status-management/visa-status-management.component';
import { HrVisaManagementPageComponent } from './pages/hr-visa-management-page/hr-visa-management-page.component';


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
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'hiringManagement', component: HiringManagementComponent, canActivate: [AuthGuard, AuthHRGuard], },
  { path: 'noTokenFound', component: NoTokenFoundComponent },
  { path: 'housing', component: HousingComponent, canActivate: [AuthGuard, AuthEmployeesGuard] },
  { path: 'report/:id', component: ReportComponent, canActivate: [AuthGuard, AuthEmployeesGuard] },
  { path: 'report/HR/:id', component: ReportHRComponent, canActivate: [AuthGuard, AuthHRGuard] },
  { path: 'notFound', component: NoPagesFoundComponent },
  { path: 'housingManagement', component: HousingManagementComponent, canActivate: [AuthGuard, AuthHRGuard]},
  { path: 'housingManagement/:id', component: HouseSummaryComponent, canActivate: [AuthGuard, AuthHRGuard]},
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
  {
    path: 'visaStatusManagement',
    component: VisaStatusManagementComponent,
    canActivate: [AuthGuard, AuthEmployeesGuard],
  },
  { path: 'hr/visaManagement', component: HrVisaManagementPageComponent, canActivate: [AuthGuard, AuthHRGuard] },
  { path: '**', component: NoPagesFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
