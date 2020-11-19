import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailCheckService } from '../../services/email-check.service'
import { map } from 'rxjs/operators';
import { SpecialityModelServer, SpecialityResponse } from 'src/models/specialtyModel';
import { SpecialityService } from 'src/app/services/specialty.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyModelServer } from 'src/models/companyModel';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  registrationForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
  comparePassword: boolean;
  registrationMessage: string;
  specialities: SpecialityModelServer[] = [];
  speciality: SpecialityModelServer;
  SERVER_URL = environment.SERVER_URL
  company: CompanyModelServer
  option;
  inValidMessage;
  message: string;

  constructor(
    private checkEmailService: EmailCheckService,
    private specialtyService: SpecialityService,
    private companyService: CompanyService,
    private router: Router,
    private http: HttpClient) {

    this.registrationForm = new FormGroup({
      name: new FormControl('five points', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('f@gmail.com', [Validators.required, Validators.pattern(this.emailPattern)],
        [this.checkEmailService.emailValidate()]
      ),
      password: new FormControl('xxxXXX@1', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('xxxXXX@1', [Validators.required, Validators.minLength(6)]),
      specialty: new FormControl([Validators.required]),
    });
  };

  get formControls() {
    return this.registrationForm.controls;
  }


  ngOnInit(): void {
    this.formCheck();
    this.getSpecialities();
  }

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
  registerCompany() {
    if (!this.registrationForm.valid) {
      return
    }else {

    this.companyService.registerCompany(this.registrationForm.value).subscribe( res => {
      this.company = res.company
      console.log("registred company: ", this.company);
    })
    // this.companyService.registerCompany(this.registrationForm.value)
    // this.registrationForm.reset();
    this.router.navigate(['/company_login'])
    };
  };
};

export interface CompanyResponseData {
  message: string;
  company: CompanyModelServer
}

