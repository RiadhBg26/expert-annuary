import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service'

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from "rxjs/operators";
import { CompanyModelServer } from '../../../models/companyModel';
import { FormGroup, NgForm, FormControl, Validators, FormArray } from '@angular/forms';
import { ExpertModelServer } from 'src/models/expertModel';
import { ExpertService } from 'src/app/services/expert.service';
import { JobRequestService } from 'src/app/services/job-request.service';
import { JobRequestModelServer } from 'src/models/jobRequestModel';
import { MatChipInputEvent } from '@angular/material/chips';
import { SkillModelServer } from 'src/models/skillModel';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-company-profile-settings',
  templateUrl: './company-profile-settings.component.html',
  styleUrls: ['./company-profile-settings.component.css']
})
export class CompanyProfileSettingsComponent implements OnInit {

  profileForm: FormGroup
  id: any;
  id2: any;
  company: CompanyModelServer;
  expert: ExpertModelServer

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
  gallery: any[] = []
  companySize: number;
  multipleImages: any[] = [];
  selectedFiles : FileList;
  jobRequests: JobRequestModelServer[]
  public imagePath;
  galleryArrayControls
  imgURL: any;
  public message: string;
  fields: any[] = []
  savedFields: any[] = [];
  fieldName: string;
  field: SkillModelServer;
  fieldValue: string[] = [];
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
      this.fields.push({ name: value.trim() });
      this.savedFields.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    if (this.fieldValue.length >= 2) {
      console.log(this.fieldValue);
    }
  }

  remove(field: any): void {
    const index = this.fields.indexOf(field);

    if (index >= 0) {
      this.fields.splice(index, 1);
    }
  }

  constructor(private companyService: CompanyService,
    private jobRequestService: JobRequestService,
    private expertService: ExpertService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      // galleryArray: new FormArray([this.galleryFunction()]),
      gallery: new FormControl(''),
      technicalInfos: new FormArray([this.infosFunction()]),
      awards: new FormArray([this.awardsFunction()]),
      location: new FormControl('')
    });
    
    this.route.paramMap.subscribe(params => {

      this.id = params.get('id');
      this.companyService.getSingleCompany(this.id).subscribe(data => {
        this.company = data
        console.log(this.company);
        // this.company = Array.of(data)
        this.gallery = this.company.gallery        
        for (let i = 0; i < this.company.profile.technicalInfos.length; i++) {
          this.image = this.company.profile.technicalInfos[i].image
          this.name = this.company.profile.technicalInfos[i].name
          this.website = this.company.profile.technicalInfos[i].website
          this.about = this.company.profile.technicalInfos[i].about
          this.founded = this.company.profile.technicalInfos[i].founded
          this.savedFields = this.company.profile.technicalInfos[i].fields
          this.companySize = this.company.profile.technicalInfos[i].companySize
          this.company.name = this.name
          console.log(this.savedFields);
          
          let infosArray = <FormArray>this.profileForm.controls['technicalInfos'] as FormArray
          let infosArrayControls = infosArray.controls['0'] as FormGroup
          // infosArrayControls.controls['name'].value
          infosArrayControls.patchValue({
            name: this.name,
            about: this.about,
            website: this.website,
            founded: this.founded,
            fields: this.savedFields,
            companySize: this.companySize
          });
        };

        for (let i = 0; i < this.company.profile.awards.length; i++) {
          this.prize = this.company.profile.awards[i].prize
          this.prizeYear = this.company.profile.awards[i].prizeYear

          let awardsArray = <FormArray>this.profileForm.controls['awards'] as FormArray
          let awardsArrayControls = awardsArray.controls['0'] as FormGroup
          // infosArrayControls.controls['name'].value
          awardsArrayControls.patchValue({
            prize: this.prize,
            prizeYear: this.prizeYear
          })
        }
        this.location = this.company.profile.location
        let profile = this.profileForm.patchValue({
          location: this.location
        });
        // let galleryArray = <FormArray>this.profileForm.controls['galleryArray'] as FormArray
        // let galleryArrayControls = galleryArray.controls['0'] as FormGroup
        // galleryArrayControls.patchValue({
        //   gallery: this.multipleImages
        // })        
      });
    });

    this.getJobRequests()
  };

  // get getGallery() {
  //   return (<FormArray>this.profileForm.get('galleryArray')) as FormArray;
  // }
  get getInfos() {
    return (<FormArray>this.profileForm.get('technicalInfos')).controls;
  }
  get getAwards() {
    return (<FormArray>this.profileForm.get('awards')).controls;
  }

  // galleryFunction(): FormGroup {
  //   return new FormGroup({
  //     gallery: new FormControl(''),
  //   })
  // };
  infosFunction(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      image: new FormControl(''),
      website: new FormControl(''),
      about: new FormControl(''),
      fields: new FormControl(''),
      companySize: new FormControl(''),
      founded: new FormControl(''),
    })
  };
  awardsFunction(): FormGroup {
    return new FormGroup({
      prize: new FormControl(''),
      prizeYear: new FormControl(''),
    })
  }

  

  editProfile() {
    let profile = { profile: this.profileForm.value }

    this.companyService.editCompany(this.id, profile).subscribe(response => {
      console.log(response);
    });
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    };
    const formData = new FormData();
    formData.append('file', this.images);
    this.companyService.addImage(this.id, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  selectMultipleImages(event) {
    const formData = new FormData();
    this.selectedFiles = event.target.files
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.multipleImages.push(event.target.files[i])
      console.log("gallery images: ",this.multipleImages);
      for (let img of this.multipleImages) {
        this.gallery.push(img)
        formData.append('files[]', img);
      }
    }
    this.companyService.addGallery(this.id, formData).subscribe(data => {
      console.log(data);
      this.gallery = data.gallery
    });
  }

  onMultipleSubmit() {
    //   const formData = new FormData();
    //   for (let img of this.gallery) {
    //     formData.append('files', img);
    //     // console.log('img:', img);
    //   }
    //   this.companyService.addGallery(this.id, formData).subscribe(data => {
    //     console.log(data);
    //   });
    //   console.log(this.gallery);

  };

  preview() {

    if (this.multipleImages.length === 0)
      return;
    var reader = new FileReader();
    this.imagePath = this.multipleImages;
    for (let i = 0; i < this.imagePath.length; i++) {
    };
    reader.readAsDataURL(this.imagePath[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      // console.log(this.imagePath);
    }

  };
  close() {
    this.imgURL = ''
  };

  //get Job Requests
  getJobRequests() {
    this.jobRequestService.getjobRequests().subscribe(data => {
      this.jobRequests = data.jobRequests
      this.id2 = this.jobRequests[0].expertId._id;
      // console.log('id2: ', this.id2);
    })
  }
}










 // this.company.profile.awards.forEach(function (value) {
 //   console.log(value);
  // })
  // for (let prop in this.company.profile.education) {
  //   console.log(prop);
  // }

