import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatComponent } from './components/chat/chat.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ExpertlistComponent } from './components/expertlist/expertlist.component';
import { CompanylistComponent } from './components/companylist/companylist.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ExpertprofileComponent } from './components/expertprofile/expertprofile.component';
import { CompanyprofileComponent } from './components/companyprofile/companyprofile.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { SuccessComponent } from './components/success/success.component';
import { BillingComponent } from './components/billing/billing.component';
import { SpecialtiesComponent } from './components/specialties/specialties.component';
import { ExpertsHomepageComponent } from './components/experts-homepage/experts-homepage.component';
import { RegisterExpertComponent } from './components/register-expert/register-expert.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { LoginExpertComponent } from './components/login-expert/login-expert.component';
import { LoginCompanyComponent } from './components/login-company/login-company.component';
import { ExpertProfileSettingsComponent } from './components/expert-profile-settings/expert-profile-settings.component';
import {ExpertGuard} from './guards/expert.guard'
import { SkillsComponent } from './components/skills/skills.component';
import { JobRequestComponent } from './components/job-request/job-request.component';
import { CompanyProfileSettingsComponent } from './components/company-profile-settings/company-profile-settings.component'
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { CompanyChatComponent } from './components/company-chat/company-chat.component';
import { CompaniesHomepageComponent } from './components/companies-homepage/companies-homepage.component';
import { ViewExpertProfileComponent } from './components/view-expert-profile/view-expert-profile.component';
import { ViewCompanyProfileComponent } from './components/view-company-profile/view-company-profile.component';
import { ExpertChatComponent } from './components/expert-chat/expert-chat.component';
import { from } from 'rxjs';
const routes: Routes = [
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'adminlogin', component: AdminloginComponent},
  {path:'dashboard', component: DashboardComponent},
  // {path:'chat', component: ChatComponent},
  // {path:'expert_chat/:id', component: ChatComponent},
  {path:'addrequests', component: RequestsComponent},
  {path:'expertlist', component: ExpertlistComponent},
  {path:'expert/:id', component: ExpertprofileComponent},
  {path:'companylist', component: CompanylistComponent},
  {path:'specialties', component: SpecialtiesComponent},
  {path:'skills', component: SkillsComponent},
  {path:'calendar', component: CalendarComponent},
  {path:'company/:id', component: CompanyprofileComponent},
  {path:'success', component: SuccessComponent},
  {path:'bill', component: BillingComponent},
  {path:'expert_register', component: RegisterExpertComponent},
  {path:'expert_login', component: LoginExpertComponent},
  {path:'expert_profile_settings/:id', component: ExpertProfileSettingsComponent},  
  {path:'expert_home/:id/:id2', component: ExpertsHomepageComponent},
  {path:'expert_chat/:id/:id2', component: ExpertChatComponent},
  {path:'job_requests/:id', component: JobRequestComponent},
  {path:'company_register', component: RegisterCompanyComponent},
  {path:'company_login', component: LoginCompanyComponent},
  {path:'company_profile_settings/:id', component: CompanyProfileSettingsComponent},
  {path:'job_offers/:id', component: JobOffersComponent},
  {path:'company_chat/:id/:id2', component: CompanyChatComponent},
  // {path:'company_home/:id', component: CompaniesHomepageComponent},
  {path:'company_home/:id/:id2', component: CompaniesHomepageComponent},
  {path:'view_expert/:id2', component: ViewExpertProfileComponent},
  {path:'view_company/:id2', component: ViewCompanyProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
