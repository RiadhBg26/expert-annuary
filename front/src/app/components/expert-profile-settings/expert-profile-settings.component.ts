import { Component, OnInit } from '@angular/core';
import { ExpertService } from 'src/app/services/expert.service';

import { ProfileService } from 'src/app/services/profile.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from "rxjs/operators";
import { ExpertModelServer } from 'src/models/expertModel';
import { FormGroup, NgForm, FormControl, Validators, FormArray } from '@angular/forms';
import { fn } from '@angular/compiler/src/output/output_ast';
import { CompanyModelServer } from 'src/models/companyModel';
import { CompanyService } from 'src/app/services/company.service';
import { JobOfferService } from 'src/app/services/job-offer.service';
@Component({
  selector: 'app-expert-profile-settings',
  templateUrl: './expert-profile-settings.component.html',
  styleUrls: ['./expert-profile-settings.component.css']
})
export class ExpertProfileSettingsComponent implements OnInit {

  profileForm: FormGroup
  id: any;
  id2: any;
  expert: ExpertModelServer;
  firm: CompanyModelServer
  jobOffers;
  year;
  age;
  image
  username
  fname
  lname
  biography
  degree: [] = []
  institution: [] = []
  completionYear: [] = []
  selectedFiles : FileList
  multipleImages: any[] = []
  doc;
  company
  from
  to
  prize
  prizeYear
  address
  file;
  images
  educationArray;
  experienceArray;
  awardsArray;
  constructor(private expertService: ExpertService,
    private companyService: CompanyService,
    private jobOfferService: JobOfferService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      personalInfos: new FormArray([this.infosFunction()]),
      education: new FormArray([this.educationFunction()]),
      experience: new FormArray([this.experienceFunction()]),
      awards: new FormArray([this.awardsFunction()]),
      address: new FormControl(''),
    });

    //get single expert
    this.route.paramMap.subscribe(params => {

      this.id = params.get('id');
      this.expertService.getSingleExpert(this.id).subscribe(data => {
        // this.expert = Array.of(data)
        this.expert = data
        console.log('this: ', this.expert);
        this.educationArray = this.expert.profile.education
        this.experienceArray = this.expert.profile.experience
        this.awardsArray = this.expert.profile.awards
        for (let i = 0; i < this.expert.profile.personalInfos.length; i++) {
          // console.log(this.expert.profile.personalInfos[i].fname);
          this.image = this.expert.profile.personalInfos[i].image
          this.username = this.expert.profile.personalInfos[i].username
          this.fname = this.expert.profile.personalInfos[i].fname
          this.lname = this.expert.profile.personalInfos[i].lname
          this.biography = this.expert.profile.personalInfos[i].biography
          this.expert.username = this.username

          let infosArray = <FormArray>this.profileForm.controls['personalInfos'] as FormArray
          let infosArrayControls = infosArray.controls['0'] as FormGroup
          // infosArrayControls.controls['username'].value
          infosArrayControls.patchValue({
            image: this.images,
            username: this.username,
            fname: this.fname,
            lname: this.lname,
            biography: this.biography
          })

        }
        for (let i = 0; i < this.expert.profile.education.length; i++) {
          this.degree = this.expert.profile.education[i].degree
          this.institution = this.expert.profile.education[i].institution
          this.completionYear = this.expert.profile.education[i].completionYear
          this.doc = this.expert.profile.education[i].document
          console.log(this.degree);
          let educationArray = <FormArray>this.profileForm.controls['education'] as FormArray
          let educationArrayControls = educationArray.controls['0'] as FormGroup
          // infosArrayControls.controls['username'].value
          educationArrayControls.patchValue({
            degree: this.degree,
            institution: this.institution,
            completionYear: this.completionYear,
            // document: this.doc
          })
          
          
        }
        for (let i = 0; i < this.expert.profile.experience.length; i++) {
          this.company = this.expert.profile.experience[i].company
          this.from = this.expert.profile.experience[i].from
          this.to = this.expert.profile.experience[i].to

          let experienceArray = <FormArray>this.profileForm.controls['experience'] as FormArray
          let experienceArrayControls = experienceArray.controls['0'] as FormGroup
          // infosArrayControls.controls['username'].value
          experienceArrayControls.patchValue({
            company: this.company,
            from: this.from,
            to: this.to
          })
        }
        for (let i = 0; i < this.expert.profile.awards.length; i++) {
          this.prize = this.expert.profile.awards[i].prize
          this.prizeYear = this.expert.profile.awards[i].prizeYear

          let awardsArray = <FormArray>this.profileForm.controls['awards'] as FormArray
          let awardsArrayControls = awardsArray.controls['0'] as FormGroup
          // infosArrayControls.controls['username'].value
          awardsArrayControls.patchValue({
            prize: this.prize,
            prizeYear: this.prizeYear
          })
        }
        this.address = this.expert.profile.address
        let profile = this.profileForm.patchValue({
          address: this.address
        })

        
        this.year = new Date().getFullYear();
        // console.log("year: ",this.year);
        this.age = this.year - new Date(this.expert.bday).getFullYear()
        // // console.log("age: ", this.age);
        // if (this.images == null || this.images == undefined || this.images == "") {
        //   this.images = "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg"
        // }
        // else {
        //   this.expert.image
        //   return
        // }
      });
    });

    this.getJobOffers()
  };

  get getInfos() {
    return (<FormArray>this.profileForm.get('personalInfos')).controls;
  }
  get getEducation() {
    return (<FormArray>this.profileForm.get('education')).controls;
  }
  get getExperience() {
    return (<FormArray>this.profileForm.get('experience')).controls;
  }
  get getAwards() {
    return (<FormArray>this.profileForm.get('awards')).controls;
  }

  infosFunction(): FormGroup {
    return new FormGroup({
      image: new FormControl(''),
      username: new FormControl(''),
      fname: new FormControl(''),
      lname: new FormControl(''),
      biography: new FormControl(''),
    })
  }
  educationFunction(): FormGroup {
    return new FormGroup({
      degree: new FormControl(''),
      institution: new FormControl(''),
      completionYear: new FormControl(''),
      document: new FormControl('')
    })
  }
  experienceFunction(): FormGroup {
    return new FormGroup({
      company: new FormControl(''),
      from: new FormControl(''),
      to: new FormControl(''),
      document: new FormControl('')

    })
  };
  awardsFunction(): FormGroup {
    return new FormGroup({
      prize: new FormControl(''),
      prizeYear: new FormControl(''),
      document: new FormControl('')

    })
  }

  addEducationArray() {
    const array = this.profileForm.get('education') as FormArray;
    array.push(this.educationFunction())
  }

  addExperienceArray() {
    const array = this.profileForm.get('experience') as FormArray;
    array.push(this.experienceFunction())
  }

  addAwardsArray() {
    const array = this.profileForm.get('awards') as FormArray;
    array.push(this.awardsFunction())
  }
  editProfile() {
    let profile = { profile: this.profileForm.value }
    this.expertService.editExpert(this.id, profile).subscribe(exp => {
      console.log(exp);
    });
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < this.expert.profile.personalInfos.length; i++) {
        const file = event.target.files[0];
        this.images = file;
        this.image = this.expert.profile.personalInfos[i].image = this.images
        console.log(this.image);
      }
    };
    const formData = new FormData();
    formData.append('file', this.images);
    this.expertService.addImage(this.id, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  // selectFile(event) {
  //   if (event.target.files.length > 0) {
  //     for (let i = 0; i < this.expert.profile.education.length; i++) {
  //       const file = event.target.files[0];
  //       this.file = file;
  //       this.doc = this.file
  //       console.log('doc: ', this.doc);
  //     }
  //   };
  //   const formData = new FormData();
  //   formData.append('doc', this.file);
  //   this.expertService.uploadDoc(this.id, formData).subscribe(
  //     (res) => console.log(res),
  //     (err) => console.log(err)
  //   );
  // }
  //get Job Requests
  getJobOffers() {
    this.jobOfferService.getjobOffers().subscribe(data => {
      this.jobOffers = data.jobOffers
      this.id2 = this.jobOffers[0].companyId._id;
      // console.log('id2: ', this.id2);
    })
  }
  // onSubmit(){
  // }

}










 // this.expert.profile.awards.forEach(function (value) {
 //   console.log(value);
  // })
  // for (let prop in this.expert.profile.education) {
  //   console.log(prop);
  // }

