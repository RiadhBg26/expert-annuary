import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/company.service';
import { ExpertService } from 'src/app/services/expert.service';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { ProfileService } from 'src/app/services/profile.service';
import { CompanyModelServer } from 'src/models/companyModel';
import { ExpertModelServer } from 'src/models/expertModel';
import { JobOfferModelServer } from 'src/models/jobOfferModel';
import { JobRequestModelServer } from 'src/models/jobRequestModel';

@Component({
  selector: 'app-experts-homepage',
  templateUrl: './experts-homepage.component.html',
  styleUrls: ['./experts-homepage.component.css']
})
export class ExpertsHomepageComponent implements OnInit {
  profileForm: FormGroup
  id: any;
  id2: any;
  expert: ExpertModelServer;
  firm: CompanyModelServer;
  jobOffers: JobOfferModelServer[] = []
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
  jobTitle;
  jobType;
  jobDescription;
  skills;
  salary;
  posted
  expires
  constructor(private expertService: ExpertService,
    private companyService: CompanyService,
    private jobOfferService: JobOfferService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    //get single expert
    this.route.paramMap.subscribe(params => {

      this.id = params.get('id');
      this.id2 = params.get('id2');
      // console.log('Expert ID is: ', this.id);
      this.expertService.getSingleExpert(this.id).subscribe(data => {
        // this.expert = Array.of(data)
        this.expert = data
        // console.log(this.expert);
        for (let i = 0; i < this.expert.profile.personalInfos.length; i++) {
          // console.log(this.expert.profile.personalInfos[i].fname);
          this.image = this.expert.profile.personalInfos[i].image
          this.username = this.expert.profile.personalInfos[i].username
          this.fname = this.expert.profile.personalInfos[i].fname
          this.lname = this.expert.profile.personalInfos[i].lname
          this.biography = this.expert.profile.personalInfos[i].biography
          this.expert.username = this.username

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
    this.companyService.getSingleCompany(this.id2).subscribe((company: CompanyModelServer) => {
      this.firm = company

      for (let i = 0; i < this.firm.jobOffers.length; i++) {
        const company = this.firm.jobOffers[i];
        console.log(this.firm.jobOffers[i]);
        this.jobTitle = company.jobTitle
        this.jobType = company.jobType
        this.jobDescription = company.jobDescription
        this.skills = company.jobRequirements
        this.salary = company.salary;
        this.posted = company.posted;
        this.expires = company.expires

        
      }
    });

    this.getJobOffers()
  };

  //get Job Requests
  getJobOffers() {
    this.jobOfferService.getjobOffers().subscribe(data => {
      this.jobOffers = data.jobOffers
      // console.log(this.jobOffers);
      this.id2 = this.jobOffers[0].companyId._id;
      // console.log('id2: ', this.id2);
    })
  };

  //get single expert
  selectCompany(id: number) {
    this.router.navigate(['/view_company', this.id2]).then();
    // console.log(id);
  };
}
