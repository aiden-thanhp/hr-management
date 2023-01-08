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
      },
      {}
    ),
  ],
  providers: [RegisTokenGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
