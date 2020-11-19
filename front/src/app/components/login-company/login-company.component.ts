import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { SocialAuthService } from 'angularx-social-login';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpertService } from 'src/app/services/expert.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExpertModelServer } from 'src/models/expertModel';
import { CompanyModelServer } from 'src/models/companyModel';
import { CompanyService } from 'src/app/services/company.service';


@Component({
  selector: 'app-login-company',
  templateUrl: './login-company.component.html',
  styleUrls: ['./login-company.component.css']
})
export class LoginCompanyComponent implements OnInit {


  SERVER_URL = environment.SERVER_URL
  email: string;
  password: string;
  loginMessage: string;
  userRole: number;
  loginForm: FormGroup;
  companies: CompanyModelServer[] = [];
  company: CompanyModelServer;
  isLoggedIn: { isLoggedIn: boolean; };
  id: number;
  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private expertService: ExpertService,
    private companyService: CompanyService,
    private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('f@gmail.com',[Validators.required]),
      password: new FormControl('xxxXXX@1',[Validators.required]),
    });
    this.login()
  };

  getLoginFormControls() {
    return this.loginForm.controls;
  }


   async login () {
   if (this.loginForm.valid) {
    // console.log(this.loginForm.value);
      this.companyService.companyLogin(this.loginForm.value).subscribe( (loginResponse: CompanyLoginResponse) => {
      this.company = loginResponse.company
      this.id = loginResponse.companyId;
      console.log("CompanyId:", this.id);
      let data = {isLoggedIn : true}
      console.log(this.id);
      
     this.companyService.editCompany(this.id, data).subscribe(res => {
         console.log("edit response:", data, this.id);
      })
    })
    
    await this.router.navigate(['/company_profile_settings/', this.id])
    // this.companyService.activeUser(this.loginForm);
    // this.loginForm.reset()
    
   }else {
     return
   }
  };


  signInWithGoogle() {
    this.registrationService.googleLogin();
  };


};

export interface CompanyLoginResponse {
  token: string;
  company: CompanyModelServer;
  companyId: number
}

  // login(loginForm: NgForm) {
  //   const email = this.email;
  //   const password = this.password;

  //   if (loginForm.invalid) {
  //     return;
  //   }

  //   loginForm.reset();
  //   this.companyService.expertLogin(email, password).subscribe( res => {
  //     console.log(res);
      
  //   });

  //   this.registrationService.loginMessage$.subscribe(msg => {
  //     this.loginMessage = msg;
  //     setTimeout(() => {
  //       this.loginMessage = '';
  //     }, 2000);
  //   });


  // }


