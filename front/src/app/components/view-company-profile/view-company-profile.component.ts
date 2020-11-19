import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { ExpertService } from 'src/app/services/expert.service';
import { JobRequestService } from 'src/app/services/job-request.service';
import { CompanyModelServer } from 'src/models/companyModel';
import { ExpertModelServer } from 'src/models/expertModel';
import { JobRequestModelServer } from 'src/models/jobRequestModel';

@Component({
  selector: 'app-view-company-profile',
  templateUrl: './view-company-profile.component.html',
  styleUrls: ['./view-company-profile.component.css']
})
export class ViewCompanyProfileComponent implements OnInit {

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
  gallery;
  specialty;
  fields;
  companySize;
  multipleImages: any[] = [];
  jobRequests: JobRequestModelServer[]
  jobOffers;
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
      
      this.id2 = params.get('id2');
      this.companyService.getSingleCompany(this.id2).subscribe(data => {
        this.company = data
        // this.company = Array.of(data)
        this.company = data
        this.image = this.company.image
        console.log(this.company);
        this.jobOffers = this.company.jobOffers
        this.specialty = this.company.specialty
        // console.log('job offers: ', this.jobOffers);
        for (let i = 0; i < this.company.profile.technicalInfos.length; i++) {
          this.image = this.company.profile.technicalInfos[i].image
          this.name = this.company.profile.technicalInfos[i].name
          this.website = this.company.profile.technicalInfos[i].website
          this.about = this.company.profile.technicalInfos[i].about
          this.founded = this.company.profile.technicalInfos[i].founded
          this.gallery = this.company.profile.technicalInfos[i].gallery
          this.fields = this.company.profile.technicalInfos[i].fields
          this.companySize = this.company.profile.technicalInfos[i].companySize

          this.company.name = this.name
        };

        for (let i = 0; i < this.company.profile.awards.length; i++) {
          this.prize = this.company.profile.awards[i].prize
          this.prizeYear = this.company.profile.awards[i].prizeYear
        }
        this.location = this.company.profile.location;
        
      });
    });
    this.getJobRequests()

  };

  selectImage(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < this.company.profile.technicalInfos.length; i++) {
        const file = event.target.files[0];
        this.images = file;
        this.image = this.company.profile.technicalInfos[i].image
        this.image = this.images
        console.log(this.image);
      }
    };

    const formData = new FormData();
    formData.append('file', this.images);
    this.companyService.addImage(this.id, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  selectMultipleImages(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.multipleImages.push(event.target.files[i])
      this.gallery = this.multipleImages
      console.log(this.gallery);

    }
  }

  onMultipleSubmit() {
    const formData = new FormData();
    for (let img of this.gallery) {
      formData.append('files', img);
      console.log('img:', img);
    }
    this.companyService.addImage(this.id, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
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
        console.log('id2: ', this.id2);
    })
  }
}










 // this.company.profile.awards.forEach(function (value) {
 //   console.log(value);
  // })
  // for (let prop in this.company.profile.education) {
  //   console.log(prop);
  // }


