import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyResponse, CompanyModelServer } from 'src/models/companyModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css']
})
export class CompanylistComponent implements OnInit {
  companies: CompanyModelServer[];
  numberOfCompanies: number;
  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.getCompanies()
  }

   // get all companies
   getCompanies() {
    this.companyService.getCompanies(10).subscribe((data: CompanyResponse) => {
      this.companies = data.companies
      this.numberOfCompanies = data.count
      console.log(this.companies);
      
    });
  };

  //get single expert
  selectCompany(id: number) {
    this.router.navigate(['/company', id]).then();
    console.log(id);
  };
}
