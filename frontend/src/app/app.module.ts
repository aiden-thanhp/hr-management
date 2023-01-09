import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

import { userReducer } from './store/user/user.reducer';
import { regisTokenReducer } from './store/regisToken/regisToken.reducer';
import { RegisterComponent } from './components/register/register.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { HiringManagementComponent } from './pages/hiringManagement/hiring-management.component';
import { NoTokenFoundComponent } from './pages/errors/no-token-found/no-token-found.component';
import { RegisTokenGuard } from './guards/regisToken.guard';
import { NoPagesFoundComponent } from './pages/errors/no-pages-found/no-pages-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { profileReducer } from './store/profile/profile.reducer';
import { profilesReducer } from './store/profiles/profiles.reducer';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { EmployeesProfileComponent } from './pages/employees-profile/employees-profile.component';
import { SearchPipe } from './pipes/search.pipe';
import { VisaStatusManagementComponent } from './pages/visa-status-management/visa-status-management.component';

@NgModule({
  declarations: [
    AppComponent,
    OnboardingComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PersonalInformationComponent,
    HiringManagementComponent,
    NoTokenFoundComponent,
    NoPagesFoundComponent,
    FooterComponent,
    ProfilePageComponent,
    EmployeesProfileComponent,
    SearchPipe,
    VisaStatusManagementComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(
      {
        user: userReducer,
        regisToken: regisTokenReducer,
        profile: profileReducer,
        profiles: profilesReducer,
      },
      {}
    ),
  ],
  providers: [RegisTokenGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
