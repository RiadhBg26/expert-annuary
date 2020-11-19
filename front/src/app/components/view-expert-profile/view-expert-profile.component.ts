import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/company.service';
import { ExpertService } from 'src/app/services/expert.service';
import { ExpertModelServer } from 'src/models/expertModel';

@Component({
  selector: 'app-view-expert-profile',
  templateUrl: './view-expert-profile.component.html',
  styleUrls: ['./view-expert-profile.component.css']
})
export class ViewExpertProfileComponent implements OnInit {
  id2: number;
  isConfirmed: boolean;
  expert;
  jobTitle;
  jobDescription;
  skills;
  posted
  today;
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
  constructor(private expertService: ExpertService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    //get single expert
    this.route.paramMap.pipe(map((param: ParamMap) => {
      // @ts-ignore
      return param.params.id2;
    })
    ).subscribe(expertId => {
      this.id2 = expertId;
      console.log('Expert ID is: ', this.id2);
      this.expertService.getSingleExpert(this.id2).subscribe((expert: ExpertModelServer) => {
        this.expert = expert
        for (let i = 0; i < expert.jobRequests.length; i++) {
          this.jobTitle = expert.jobRequests[i].jobTitle
          this.jobDescription = expert.jobRequests[i].jobDescription
          this.skills = expert.jobRequests[i].skills
          this.posted = expert.jobRequests[i].posted
          console.log("skills: ", this.posted);
          let date = new Date()
          let todayYear = date.getUTCFullYear()
          let todayMonth = date.getUTCMonth()
          let todayDay = date.getUTCDay()
          this.today = todayYear , todayMonth , todayDay
          console.log(this.today);
        }
        
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

      })
    });
  }

}
