import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';




// import { GoogleMapsModule } from '@angular/google-maps'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatComponent } from './components/chat/chat.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ExpertsHomepageComponent } from './components/experts-homepage/experts-homepage.component';
import { CompaniesHomepageComponent } from './components/companies-homepage/companies-homepage.component';
import { ExpertlistComponent } from './components/expertlist/expertlist.component';
import { CompanylistComponent } from './components/companylist/companylist.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ExpertprofileComponent } from './components/expertprofile/expertprofile.component';
import { CompanyprofileComponent } from './components/companyprofile/companyprofile.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { SuccessComponent } from './components/success/success.component';
import { BillingComponent } from './components/billing/billing.component';
import { SpecialtiesComponent } from './components/specialties/specialties.component';
import { RegisterExpertComponent } from './components/register-expert/register-expert.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { LoginCompanyComponent } from './components/login-company/login-company.component';
import { LoginExpertComponent } from './components/login-expert/login-expert.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { ExpertProfileSettingsComponent } from './components/expert-profile-settings/expert-profile-settings.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { SkillsComponent } from './components/skills/skills.component';
import { JobRequestComponent } from './components/job-request/job-request.component';
import { CompanyProfileSettingsComponent } from './components/company-profile-settings/company-profile-settings.component';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { CompanyChatComponent } from './components/company-chat/company-chat.component';
import { ViewExpertProfileComponent } from './components/view-expert-profile/view-expert-profile.component';
import { ViewCompanyProfileComponent } from './components/view-company-profile/view-company-profile.component';
import { ExpertChatComponent } from './components/expert-chat/expert-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChatComponent,
    RequestsComponent,
    ExpertsHomepageComponent,
    CompaniesHomepageComponent,
    ExpertlistComponent,
    CompanylistComponent,
    CalendarComponent,
    ExpertprofileComponent,
    CompanyprofileComponent,
    AdminloginComponent,
    SuccessComponent,
    BillingComponent,
    SpecialtiesComponent,
    RegisterExpertComponent,
    RegisterCompanyComponent,
    LoginCompanyComponent,
    LoginExpertComponent,
    ExpertProfileSettingsComponent,
    CompanyProfileComponent,
    SkillsComponent,
    JobRequestComponent,
    CompanyProfileSettingsComponent,
    JobOffersComponent,
    CompanyChatComponent,
    ViewExpertProfileComponent,
    ViewCompanyProfileComponent,
    ExpertChatComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    BrowserAnimationsModule
    // GoogleMapsModule,
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '579528719009-3gbj7c2ftm9qjcdcmun6vg55kldf2ioa.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'clientId'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
