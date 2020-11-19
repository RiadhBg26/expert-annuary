import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { EmailCheckService } from '../../services/email-check.service'
import { map } from 'rxjs/operators';
import { SpecialityModelServer, SpecialityResponse } from 'src/models/specialtyModel';
import { SpecialityService } from 'src/app/services/specialty.service';
import { Router } from '@angular/router';
import { ExpertService } from 'src/app/services/expert.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExpertModelServer } from 'src/models/expertModel';
import { CompanyModelServer } from 'src/models/companyModel';
@Component({
  selector: 'app-register-expert',
  templateUrl: './register-expert.component.html',
  styleUrls: ['./register-expert.component.css']
})
export class RegisterExpertComponent implements OnInit {
  registrationForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
  comparePassword: boolean;
  registrationMessage: string;
  specialities: SpecialityModelServer[] = [];
  speciality: SpecialityModelServer;
  SERVER_URL = environment.SERVER_URL
  expert: ExpertModelServer
  option;
  inValidMessage;
  message: string;

  constructor(private checkEmailService: EmailCheckService,
    private registrationService: RegistrationService,
    private specialtyService: SpecialityService,
    private expertService: ExpertService,
    private router: Router,
    private http: HttpClient) {

    this.registrationForm = new FormGroup({
      username: new FormControl('Riadh', [Validators.required, Validators.minLength(4)]),
      // fname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      // lname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      bday: new FormControl('12/05/1992', [Validators.minLength(4)]),
      email: new FormControl('test@gmail.com', [Validators.required, Validators.pattern(this.emailPattern)],
        [this.checkEmailService.emailValidate()]
      ),
      password: new FormControl('xxxXXX@1', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('xxxXXX', [Validators.required, Validators.minLength(6)]),
      specialty: new FormControl('TEST', [Validators.required]),
    });
  }

  get formControls() {
    return this.registrationForm.controls;
  }


  ngOnInit(): void {
    this.formCheck();
    this.ageCalc();
    this.getSpecialities();
  }


  ageCalc() {
    let todayYear;
    let diffMonth;
    let todayMonth;
    let today = new Date();
    todayYear = today.getUTCFullYear();    //tyear = today's year (2019)
    todayMonth = today.getUTCMonth();   //tyear = today's month (10 +1)
    // todayDay = today.getUTCday();       //tyear = today's year (19)

    let birthday = new Date((document.getElementById("bday") as HTMLInputElement).value);
    
    let birthdayYear = birthday.getUTCFullYear();  //bYear   = birthday's year( the value that user defines)
    let birthdayMonth = birthday.getUTCMonth(); //bMonth  = birthday's month( the value that user defines)
    // birdhtdayDay = birthday.getUTCDay();     //bDay    = birthday's day( the value that user defines)

    let diffYear = todayYear - birthdayYear;
    diffMonth = todayMonth - birthdayMonth

    if (diffYear < 25) {
      this.inValidMessage = "too young to be an expert"
      return false;
    } else if (diffYear == 25) {
      if (diffMonth == 0) {
        return false
      }
    } else {
      this.inValidMessage = "good"
    }
    return true
  }
  // ________________________End_of_ageCalc_function______________________________

  formCheck() {
    this.registrationForm.valueChanges
      .pipe(map((controls) => {
        return this.formControls.confirmPassword.value === this.formControls.password.value;
      }))
      .subscribe(passwordState => {
        // console.log(passwordState);
        this.comparePassword = passwordState;
      });
  }

  /* Get Specialities */
  getSpecialities() {
    this.specialtyService.getSpecialities().subscribe((data: SpecialityResponse) => {
      this.specialities = data.specialties
      // console.log(this.specialities);
    });
  };

  /* Getter method to access formcontrols */
  get specialty() {
    return this.registrationForm.get('specialty');
  };

  /*Choose city using select dropdown*/
  changeSpec(e) {
    let selectElementText = event.target['options']
    [event.target['options'].selectedIndex].text;
    // console.log(selectElementText);
    // console.log(this.registrationForm.get('specialty').value);
  }

  /* Register User */
  registerUser() {
    if (!this.registrationForm.valid) {
      return
    }else {

    this.expertService.registerExpert(this.registrationForm.value).subscribe( (res: ResponseData) => {
      // console.log("response from backend: ", res);
      this.message = res.message;
      this.expert = res.expert
      console.log("registred expert:: ", this.expert);
    })
    this.expertService.registerUser(this.registrationForm.value)
    // this.registrationForm.reset();
    this.router.navigate(['/expert_login'])
    };
  };
};




export interface ResponseData {
  message: string;
  expert: ExpertModelServer
}















































  // /* Register User */
  // registerUser() {
  //   if (!this.registrationForm.valid) {
  //     return
  //   }else {
      
  //   let element = document.getElementById("mySelect") as HTMLSelectElement;
  //   this.option = element.options[element.selectedIndex].text
  //   let value = element.options[element.selectedIndex].value;

  //   let x = this.registrationForm.controls['specialty'].value
  //   // console.log("speciality is: ",x);
  //   x = this.option
  //   // console.log("speciality is: ",x);
  //   // console.log('form value:  ', this.registrationForm.value);

  //   this.expertService.registerExpert(this.registrationForm.value).subscribe( res => {
  //     console.log("response from backend: ", res);
      
  //   })
  //   this.expertService.registerUser(this.registrationForm.value)
  //   // this.registrationForm.reset();
  //   // this.router.navigate(['/exlogin'])

  //   // // @ts-ignore
  //   // this.registrationService.registerUser({ ...this.registrationForm.value }).subscribe((response: { message: string }) => {
  //   //   this.registrationMessage = response.message;
  //   //   console.log(response);

  //   // });

   
  //   };
  // };