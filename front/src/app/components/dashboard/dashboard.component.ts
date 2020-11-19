import { Component, OnInit } from '@angular/core';
import { ExpertService } from '../../services/expert.service'
import { CompanyService } from '../../services/company.service'
import { ExpertModelServer, ExpertResponse } from 'src/models/expertModel';
import { CompanyModelServer, CompanyResponse } from 'src/models/companyModel';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  experts: ExpertModelServer[] = [];
  expert: ExpertModelServer;
  numberOfExperts: number;
  numberOfCompanies: number;
  id: number;
  today = new Date();
  isConfirmed: any;
  position: number;
  companies: CompanyModelServer[] = [];
  profile: any;
  config: any;
  collection = { count: this.experts.length, data: [] };

  constructor(private expertService: ExpertService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute) {


    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }


  ngOnInit(): void {
    this.getExperts()
    this.getCompanies();

  };

  //get all experts
  getExperts() {
    this.expertService.getExperts(10).subscribe((data: ExpertResponse) => {
      this.experts = data.experts;
      this.numberOfExperts = data.count;
      console.log(this.experts);
      this.collection = { count: this.numberOfExperts, data: [] };

      for (let i = 0; i < this.experts.length; i++) {
        const element = this.experts[i];

        //Create dummy data
        for (var j = 0; j < this.collection.count; j++) {
          this.collection.data.push(
            {
              id: j + 1,
              value: {
                username: this.experts[j].username,
                _id: this.experts[j]._id,
                specialty: this.experts[j].specialty,
                status: this.experts[j].isLoggedIn,
                isConfirmed: this.experts[j].isConfirmed
              }
            }
          );
        }

      }

      for (let i = 0; i < this.experts.length; i++) {
        if (this.experts[i].image == null || this.experts[i].image == undefined || this.experts[i].image == "") {
          this.experts[i].image = "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg"
        }
        else {
          this.experts[i].image
          return
        }

      }

    });
  };

  //get single expert
  selectExpert(id: number) {
    this.router.navigate(['/expert', id]).then();
    console.log(id);
  };

  //accept Expert
  acceptExpert(id, isConfirmed) {
    isConfirmed = true;
    let data = { isConfirmed: true }
    this.expertService.editExpert(id, data).subscribe((expert: ExpertModelServer) => {
      let index = this.experts.map(item => { return item._id }).indexOf(expert._id);
      // let loop = this.experts.findIndex(x => x._id === expert._id)
      // console.log(index);
      // console.log(expert.isConfirmed);
      let x = expert['_id']
      expert.isConfirmed = isConfirmed
      this.experts[index] = expert
      console.log(this.experts);
      this.isConfirmed = data
    });
  };

  //delete expert
  deleteExpert(id) {
    this.expertService.deleteExpert(id).subscribe((expert: ExpertModelServer) => {
      id = expert._id
      this.expertService.getExperts().subscribe(experts => {
        this.experts = experts.experts
        this.experts.slice(id, 1)
        experts.experts = this.experts
        console.log(this.experts);
      });
    });
  };

  //___________________________________Company Functions________________________________________

  // get all companies
  getCompanies() {
    this.companyService.getCompanies(10).subscribe((data: CompanyResponse) => {
      this.companies = data.companies
      this.numberOfCompanies = data.count
      // console.log(this.companies);
    });
  };

  //get single expert
  selectCompany(id: number) {
    this.router.navigate(['/company', id]).then();
    console.log(id);
  };


  //accept Expert
  acceptCompany(id, isConfirmed) {
    isConfirmed = true;
    let data = { isConfirmed: true }
    this.companyService.editCompany(id, data).subscribe((company: CompanyModelServer) => {
      let index = this.experts.map(item => { return item._id }).indexOf(company._id);
      // let loop = this.experts.findIndex(x => x._id === company._id)
      // console.log(index);
      // console.log(company.isConfirmed);
      let x = company['_id']
      company.isConfirmed = isConfirmed
      this.companies[index] = company
      console.log(this.companies);
      this.isConfirmed = data
    });
  };

  //delete company
  deleteCompany(id) {
    this.companyService.deleteCompany(id).subscribe((company: CompanyModelServer) => {
      id = company._id
      this.companyService.getCompanies().subscribe(companies => {
        this.companies = companies.companies
        this.companies.slice(id, 1)
        companies.companies = this.companies
        console.log(this.companies);
      });
    });
  };

}













// for (let i = 0; i < this.experts.length; i++) {
//   JSON.stringify(this.experts[i].specialty)
//   // console.log(JSON.stringify(this.experts[i].specialty).replace(/^"(.*)"$/, '$1'));
//   let str = JSON.stringify(this.experts[i].specialty);
//   // console.log(str ,str.length);
//   let pos = 0;
//   if ( str[i] == " " ){
//       pos = i;
//   }
// }