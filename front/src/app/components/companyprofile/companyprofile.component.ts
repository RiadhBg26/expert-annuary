import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {

  id;
  isConfirmed: boolean;
  company;
  thumbImages: any[] = [];
  maps;

  constructor(private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    //get single expert
    this.route.paramMap.pipe(map((param: ParamMap) => {

      // @ts-ignore
      return param.params.id;
    })
    ).subscribe(companyId => {
      this.id = companyId;
      console.log('Expert ID is: ', this.id);
      this.companyService.getSingleCompany(this.id).subscribe(company => {
        // this.company = Array.of(company)
        this.company = company
        company.isConfirmed = true;
        this.isConfirmed = company.isConfirmed
        console.log(this.company);
        console.log("company status: ", this.isConfirmed);
        // this.thumbImages = company.gallery
        // if (company.gallery !== null) {
        //   this.thumbImages = company.gallery.split(';')
        // }
      });
    });



  }

  
}
