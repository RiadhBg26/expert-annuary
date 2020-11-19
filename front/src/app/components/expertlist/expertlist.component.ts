import { Component, OnInit } from '@angular/core';
import { ExpertService} from '../../services/expert.service'
import { CompanyService} from '../../services/company.service'
import { ExpertModelServer, ExpertResponse } from 'src/models/expertModel';
import { CompanyModelServer, CompanyResponse } from 'src/models/companyModel';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import {map} from "rxjs/operators";


@Component({
  selector: 'app-expertlist',
  templateUrl: './expertlist.component.html',
  styleUrls: ['./expertlist.component.css']
})
export class ExpertlistComponent implements OnInit {

  experts: ExpertModelServer[] = [];
  expert: ExpertModelServer;
  numberOfExperts : number;
  
  constructor(private expertService: ExpertService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getExperts()
   
  };


  getExperts() {
     //get all experts
     this.expertService.getExperts(10).subscribe( (data: ExpertResponse ) => {
      this.experts = data.experts;
      this.numberOfExperts = data.count;
      console.log(this.experts);
    });
  }

  //get single expert
  selectExpert(id: number) {
    this.router.navigate(['/expert', id]).then();
    console.log(id);
  };

    //get single expert
    sendMessage(id: number) {
      this.router.navigate(['/chat', id]).then();
      console.log(id);
    };
}
