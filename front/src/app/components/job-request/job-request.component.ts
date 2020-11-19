import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, D, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SkillService } from 'src/app/services/skill.service';
import { JobRequestService } from '../../services/job-request.service'
import { SkillModelServer } from 'src/models/skillModel';
import { JobRequestModelServer, JobRequestResponse } from 'src/models/jobRequestModel';
import { ExpertModelServer } from 'src/models/expertModel';
import { ExpertService } from 'src/app/services/expert.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-job-request',
  templateUrl: './job-request.component.html',
  styleUrls: ['./job-request.component.css']
})
export class JobRequestComponent implements OnInit {
  profileForm: FormGroup
  id: number;
  expert: ExpertModelServer;
  year;
  age;

  image
  username
  fname
  lname
  biography
  degree
  institution
  completionYear
  company
  from
  to
  prize
  prizeYear
  address
  images
  skills: any[] = []
  skillName: string;
  skill: SkillModelServer;
  skillValue: string[] = [];
  jobTitle: string;
  jobDescription: string;
  jobRequests: any[] = [];
  requests;
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
    private jobRequestService: JobRequestService,
    private expertService: ExpertService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
           //get single expert
           this.route.paramMap.pipe(map((param: ParamMap) => {
            // @ts-ignore
            return param.params.id;
          })
          ).subscribe(expertId => {
            this.id = expertId;
            // console.log('Expert ID is: ', this.id);
            this.expertService.getSingleExpert(this.id).subscribe(data => {
              // this.expert = Array.of(data)
              this.expert = data
              this.requests = this.expert.jobRequests
              console.log('requests: ', this.expert);
              
      
      
              for (let i = 0; i < this.expert.profile.personalInfos.length; i++) {
                // console.log(this.expert.profile.personalInfos[i].fname);
                this.image = this.expert.profile.personalInfos[i].image
                this.username = this.expert.profile.personalInfos[i].username
                this.fname = this.expert.profile.personalInfos[i].fname
                this.lname = this.expert.profile.personalInfos[i].lname
                this.biography = this.expert.profile.personalInfos[i].biography
                this.expert.username = this.username
      
              }
              for (let i = 0; i < this.expert.profile.education.length; i++) {
                this.degree = this.expert.profile.education[i].degree
                this.institution = this.expert.profile.education[i].institution
                this.completionYear = this.expert.profile.education[i].completionYear
              }
              for (let i = 0; i < this.expert.profile.experience.length; i++) {
                this.company = this.expert.profile.experience[i].company
                this.from = this.expert.profile.experience[i].from
                this.to = this.expert.profile.experience[i].to
              }
              for (let i = 0; i < this.expert.profile.awards.length; i++) {
                this.prize = this.expert.profile.awards[i].prize
                this.prizeYear = this.expert.profile.awards[i].prizeYear
              }
              this.address = this.expert.profile.address
      
              this.year = new Date().getFullYear();
              // console.log("year: ",this.year);
              this.age = this.year - new Date(this.expert.bday).getFullYear()
              // console.log("age: ", this.age);
              if (this.images == null || this.images == undefined || this.images == "") {
                this.images = "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg"
              }
              else {
                this.expert.image
                return
              }
            });
          });
    this.getJobRequests()
    this.skillValue
  }
  getJobRequests() {
    this.jobRequestService.getjobRequests().subscribe(data => {
      this.jobRequests = data.jobRequests
      console.log(this.jobRequests);
    })
  }

  saveReq() {

    const jobRequest = {
      expertId: this.id,
      jobTitle: this.jobTitle,
      jobDescription: this.jobDescription,
      skills: this.skills,
      posted: new Date().getFullYear()
    }

    this.jobRequestService.postJobRequest(jobRequest).subscribe(res => {
      console.log(res);

    })
  }
  deleteJobRequest(id) {
    this.jobRequestService.deleteJobRequest(id).subscribe(res => {
      console.log(res);
      this.jobRequestService.getjobRequests().subscribe(res => {
        this.jobRequests = res.jobRequests
        this.jobRequests.slice(id, 1)
      })
    })
  }
}
