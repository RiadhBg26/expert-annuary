import { Component, OnInit } from '@angular/core';
import { ExpertResponse, ExpertModelServer } from 'src/models/expertModel';
import { CompanyModelServer, CompanyResponse } from 'src/models/companyModel';
import { ExpertService } from 'src/app/services/expert.service';
import { CompanyService } from 'src/app/services/company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  
  experts: ExpertModelServer[] = [];
  expert: ExpertModelServer;
  numberOfExperts: number;
  numberOfCompanies: number;
  id: number;
  today = new Date();
  isConfirmed: any;
  position: number;
  companies: CompanyModelServer[] = [];
  items = [];
  pageOfItems: Array<any>;

  constructor(private expertService: ExpertService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getExperts()
    this.getCompanies();
    
    // an example array of 150 items to be paged
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));


  };

  //get all experts
  getExperts() {
    this.expertService.getExperts(10).subscribe((data: ExpertResponse) => {
      this.experts = data.experts;
      this.numberOfExperts = data.count;
      console.log(this.experts);
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
    let data = {isConfirmed : true}
    this.expertService.editExpert(id, data).subscribe( (expert: ExpertModelServer) => {
      let index = this.experts.map(item => {return item._id}).indexOf(expert._id); 
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
        console.log(this.experts, id);
      });
    });
  };

//___________________________________Company Functions________________________________________

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
  

 //accept Expert
 acceptCompany(id, isConfirmed) {
  isConfirmed = true;
  let data = {isConfirmed : true}
  this.companyService.editCompany(id, data).subscribe( (company: CompanyModelServer) => {
    let index = this.experts.map(item => {return item._id}).indexOf(company._id); 
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
      console.log(id);
      
    });
  });
};

//pagination
onChangePage(pageOfItems: Array<any>) {
  // update current page of items
  this.pageOfItems = pageOfItems;
}

}







