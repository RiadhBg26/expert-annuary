import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SkillService } from 'src/app/services/skill.service';
import { JobOfferService } from '../../services/job-offer.service'
import { SkillModelServer } from 'src/models/skillModel';
import { JobOfferModelServer, JobOfferResponse } from 'src/models/jobOfferModel';
import { CompanyModelServer } from 'src/models/companyModel';
import { CompanyService } from 'src/app/services/company.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { JobRequestModelServer } from 'src/models/jobRequestModel';
import { JobRequestService } from 'src/app/services/job-request.service';
@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit {
  jobOfferForm: NgForm
  id: number;
  id2: any;
  jobRequests: JobRequestModelServer[];
  company: CompanyModelServer;
  year;
  age;
  salary;
  image
  name
  about
  location
  images
  expires;
  skills: any[] = []
  skillName: string;
  skill: SkillModelServer;
  skillValue: string[] = [];
  jobTitle: string;
  jobDescription: string;
  jobOffers;
  offers;
  jobType;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    
    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    if (this.skillValue.length >= 2) {
      console.log(this.skillValue);
    }
  }

  remove(skill: any): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }


  constructor(private skillService: SkillService,
    private jobOfferservice: JobOfferService,
    private companyService: CompanyService,
    private profileService: ProfileService,
    private jobRequestService: JobRequestService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.jobOfferForm
    //get single company
    this.route.paramMap.pipe(map((param: ParamMap) => {
      // @ts-ignore
      return param.params.id;
    })
    ).subscribe(companyId => {
      this.id = companyId;
      // console.log('company ID is: ', this.id);
      this.companyService.getSingleCompany(this.id).subscribe(data => {
        // this.company = Array.of(data)
        this.company = data
        this.offers = this.company.jobOffers
        console.log('job offers: ', this.company);

        for (let i = 0; i < this.company.profile.technicalInfos.length; i++) {
          // console.log(this.company.profile.technicalInfos[i].fname);
          this.image = this.company.profile.technicalInfos[i].image
          this.name = this.company.profile.technicalInfos[i].name
          this.about = this.company.profile.technicalInfos[i].about
          this.company.name = this.name
        }
        this.location = this.company.profile.location
      });
    });

    this.getJobOffers()
    this.getJobRequests()
    this.skillValue
  }
  getJobOffers() {
    this.jobOfferservice.getjobOffers().subscribe(data => {
      this.jobOffers = data.jobOffers
      // console.log(this.jobOffers);
    })
  };
  

  changeSpec(e) {
    let selectElementText = event.target['options']
    [event.target['options'].selectedIndex].text;
    console.log('this:', selectElementText);
    // console.log(this.registrationForm.get('specialty').value);
  }
  saveOffer() {

    const jobOffer = {
      companyId: this.id,
      jobTitle: this.jobTitle,
      jobDescription: this.jobDescription,
      jobRequirements: this.skills,
      salary: this.salary,
      jobType: 'full time',
      posted: new Date().getFullYear(),
      expires: this.expires,
      location: this.location
    }

    this.jobOfferservice.postJobOffer(jobOffer).subscribe((res: any) => {
      console.log(res);
    })
  }
  deleteJobOffer(id) {
    this.jobOfferservice.deleteJobOffer(id).subscribe(res => {
      console.log(res);
      this.jobOfferservice.getjobOffers().subscribe(res => {
        this.jobOffers = res.jobOffers
        this.jobOffers.slice(id, 1)
      })
    })
  };

  getJobRequests() {
    this.jobRequestService.getjobRequests().subscribe(data => {
      this.jobRequests = data.jobRequests
        this.id2 = this.jobRequests[0].expertId._id;
        console.log('id2: ', this.id2);
    })
  }
}

export interface JobResponse {
  msg: string;
  jobOffer: JobOfferModelServer
}
export interface CompanyResponse {
  msg: string;
  company: CompanyModelServer
}