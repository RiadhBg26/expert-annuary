import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ExpertService } from 'src/app/services/expert.service';
import { map } from 'rxjs/operators';
import { ExpertModelServer } from 'src/models/expertModel';
import { FormArray, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('namebutton') namebutton: ElementRef;

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


  constructor(private expertService: ExpertService,
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
        console.log(this.expert);


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
  };

  
  addClass() {
    this.namebutton.nativeElement.classList.add('chat-slide')
    setTimeout(() => {
      this.namebutton.nativeElement.classList.remove('chat-slide')
    }, 5000);

  }

}
