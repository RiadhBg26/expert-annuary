import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, RequiredValidator } from '@angular/forms';
import { SpecialityService } from '../../services/specialty.service'
import { Router } from '@angular/router';
import { SpecialityResponse, SpecialityModelServer } from 'src/models/specialtyModel';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef

  specialities: SpecialityModelServer[] = [];
  speciality: SpecialityModelServer;
  numberOfSpecialities: number;
  myForm: FormGroup
  SERVER_URL = environment.SERVER_URL
  msg;
  url
  title;
  images;

  multipleImages = [];
  constructor(
    private specialtyService: SpecialityService,
    private router: Router,
    private elementRef: ElementRef,
    private httpClient: HttpClient) {}





  ngOnInit(): void {
    this.getSpecialities();
        /* Speciality Form*/
  }

  // // select file/image to upload
  // onFileChange(event) {
  //   if (event.target.files.length > 0) {
  //     console.log(event.target.files.length);

  //     const file = event.target.files[0];
  //     this.myForm.patchValue({
  //       fileSource: file
  //     });
  //     var mimeType = event.target.files[0].type;

  //     if (mimeType.match(/image\/*/) == null) {
  //       this.msg = "Only images are supported";
  //       console.log(this.msg);
  //       return;
  //     };

  //     // Read uploaded file / image
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (_event) => {
  //       this.msg = "";
  //       this.url = reader.result;
  //       // console.log(this.url);
  //     }
  //   }
  // }

  // /* Add Speciality */
  // submitSpecialityForm() {

  //   // console.log('form value: ',this.myForm.value);
    
  //   const formData = new FormData();
  //   // if (this.myForm.valid) {
  //     let title = formData.append('title', this.myForm.get('title').value);
  //     let file = formData.append('file', this.myForm.get('file').value);
      
  //   let data = {form: formData}
  //   // console.log(data);
    
  //     this.specialtyService.postSpeciality(formData).subscribe( 
  //       res => {
  //       console.log('Response From Server: ', res);
  //       },
  //       err => {
  //         console.log(err);
          
  //       })
  // };



// Selecting speciality image
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      // console.log(this.images);
      
    }
  };

  // Saving speciality image
  onSubmit(){
    // const formData = new FormData();
    // formData.append('file', this.images);
    let data = {title: this.title}
    this.specialtyService.postSpeciality(data).subscribe(res => {
      console.log(res);
    });
  }

  selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }


  onMultipleSubmit(){
    const formData = new FormData();
    for(let img of this.multipleImages){
      formData.append('files', img);
    }
  }

  /* Get Specialities */
  getSpecialities() {
    this.specialtyService.getSpecialities().subscribe((data: SpecialityResponse) => {
      this.specialities = data.specialties
      this.numberOfSpecialities = data.count
      console.log(this.specialities);
    });
  };

  deleteSpeciality(id) {
    this.specialtyService.deleteSpeciality(id).subscribe(res => {
      console.log(res);
      this.specialtyService.getSpecialities().subscribe((data: SpecialityResponse) => {
        this.specialities = data.specialties
        this.specialities.slice(id, 1)
        console.log(this.specialities);
      });
    });
  };
}
