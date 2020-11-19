import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service'

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from "rxjs/operators";
import { CompanyModelServer } from '../../../models/companyModel';
import { FormGroup, NgForm, FormControl, Validators, FormArray } from '@angular/forms';
import { ExpertModelServer, ExpertResponse } from 'src/models/expertModel';
import { ExpertService } from 'src/app/services/expert.service';
import { JobRequestModelServer } from 'src/models/jobRequestModel';
import { JobRequestService } from 'src/app/services/job-request.service';
@Component({
  selector: 'app-companies-homepage',
  templateUrl: './companies-homepage.component.html',
  styleUrls: ['./companies-homepage.component.css']
})
export class CompaniesHomepageComponent implements OnInit {

  profileForm: FormGroup
  id: any;
  id2: any;
  companyId: number;
  company: CompanyModelServer;
  year;
  age;
  avatar
  founded;
  image
  name
  website
  about
  prize
  prizeYear
  location
  images
  gallery;
  multipleImages: any[] = [];
  address
  experts: ExpertModelServer[] = [];
  expert: ExpertModelServer;
  jobRequests: JobRequestModelServer[];
  jobTitle;
  jobDescription;
  skills;
  posted
  today;
  public imagePath;
  imgURL: any;
  public message: string;


  constructor(private companyService: CompanyService,
    private jobRequestService: JobRequestService,
    private expertService: ExpertService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      
      this.id = params.get('id');
      this.id2 = params.get('id2');
      
      // console.log('this id =>', this.id, this.id2);
      this.companyService.getSingleCompany(this.id).subscribe(data => {
        this.company = data
      });
      this.expertService.getSingleExpert(this.id2).subscribe((expert: ExpertModelServer) => {
        this.expert = expert
        console.log(expert);
        
        for (let i = 0; i < expert.jobRequests.length; i++) {
          this.jobTitle = expert.jobRequests[i].jobTitle
          this.jobDescription = expert.jobRequests[i].jobDescription
          this.skills = expert.jobRequests[i].skills
          this.posted = expert.jobRequests[i].posted
          let date = new Date()
          let todayYear = date.getUTCFullYear()
          let todayMonth = date.getUTCMonth()
          let todayDay = date.getUTCDay()
          this.today = todayYear , todayMonth , todayDay
          
        }
        

      })
    })
    this.getExperts()
    this.getJobRequests()
  };

  //get all experts
  getExperts() {
    this.expertService.getExperts(10).subscribe((data: ExpertResponse) => {
      this.experts = data.experts;
      // console.log(this.experts);
    });
  };

  //get single expert
  selectExpert(id: number) {
    this.router.navigate(['/company_home/', this.id, id]).then();
    console.log('expertId: ', id);
  };

  getJobRequests() {
    this.jobRequestService.getjobRequests().subscribe(data => {
      this.jobRequests = data.jobRequests
      for (let i = 0; i < this.jobRequests.length; i++) {
        let expert = this.jobRequests[i].expertId;
        // console.log(expert);
        
        this.address = expert.profile.address;
        this.year = new Date().getFullYear();
        // console.log("year: ",this.year);
        this.age = this.year - new Date(expert.bday).getUTCFullYear()
      }
    })
  }

}