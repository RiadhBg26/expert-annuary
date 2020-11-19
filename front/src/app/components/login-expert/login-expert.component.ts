import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { SocialAuthService } from 'angularx-social-login';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpertService } from 'src/app/services/expert.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExpertModelServer } from 'src/models/expertModel';

@Component({
  selector: 'app-login-expert',
  templateUrl: './login-expert.component.html',
  styleUrls: ['./login-expert.component.css']
})
export class LoginExpertComponent implements OnInit {

  SERVER_URL = environment.SERVER_URL
  email: string;
  password: string;
  loginMessage: string;
  userRole: number;
  loginForm: FormGroup;
  experts: ExpertModelServer[] = [];
  expert: ExpertModelServer;
  isLoggedIn: { isLoggedIn: boolean; };
  id: any = {}
  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private expertService: ExpertService,
    private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('test@gmail.com',[Validators.required]),
      password: new FormControl('xxxXXX@1',[Validators.required]),
    })
  }

  getLoginFormControls() {
    return this.loginForm.controls;
  }

  login = async () =>  {
   if (this.loginForm.valid) {
    // console.log(this.loginForm.value);
    let email = this.loginForm.controls['email'].value
    let password = this.loginForm.controls['password'].value
    this.expertService.expertLogin(this.loginForm.value).subscribe( (loginResponse: ExpertLoginResponse) => {
      this.expert = loginResponse.expert
      this.id = loginResponse.expertId;
      console.log("expert => ", this.expert);
      let data = {isLoggedIn : true}
      this.expertService.editExpert(this.id, data).subscribe(res => {
        console.log("edit response:", data, this.id);
      })
    })
    this.router.navigate(['/expert_profile_settings', this.id])
    this.expertService.activeUser(this.loginForm);
    // this.loginForm.reset()
    
   }else {
     return
   }
  };


  signInWithGoogle() {
    this.registrationService.googleLogin();
  };


};

export interface ExpertLoginResponse {
  token: string;
  expert: ExpertModelServer;
  expertId: number
}

  // login(loginForm: NgForm) {
  //   const email = this.email;
  //   const password = this.password;

  //   if (loginForm.invalid) {
  //     return;
  //   }

  //   loginForm.reset();
  //   this.expertService.expertLogin(email, password).subscribe( res => {
  //     console.log(res);
      
  //   });

  //   this.registrationService.loginMessage$.subscribe(msg => {
  //     this.loginMessage = msg;
  //     setTimeout(() => {
  //       this.loginMessage = '';
  //     }, 2000);
  //   });


  // }

