import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import {map} from "rxjs/operators";
import { ExpertService } from 'src/app/services/expert.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-expertprofile',
  templateUrl: './expertprofile.component.html',
  styleUrls: ['./expertprofile.component.css']
})
export class ExpertprofileComponent implements OnInit {

  id: number;
  isConfirmed: boolean;
  expert;
  constructor(private expertService: ExpertService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    //get single expert
    this.route.paramMap.pipe(map((param: ParamMap) => {
      // @ts-ignore
      return param.params.id;
    })
    ).subscribe(expertId => {
      this.id = expertId;
      console.log('Expert ID is: ', this.id);
      this.expertService.getSingleExpert(this.id).subscribe(expert => {
        // this.expert = Array.of(expert)
        this.expert = expert
        expert.isConfirmed = true;
        this.isConfirmed = expert.isConfirmed
        console.log(this.expert.profile.personalInfos);
        console.log("expert status: ", this.isConfirmed);
        
      });
    });
  }

}
