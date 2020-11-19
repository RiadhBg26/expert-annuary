
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobOfferModelServer, JobOfferResponse } from '../../models/jobOfferModel';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  private SERVER_URL = environment.SERVER_URL
  constructor(private httpClient: HttpClient, private router: Router,
    ) { }

    getjobOffers(): Observable<JobOfferResponse> {
    return this.httpClient.get<JobOfferResponse>(this.SERVER_URL + '/jobOffer')
  };

  //get single Expert
  getSingleJobOffer(id: number): Observable <JobOfferModelServer> {
    return this.httpClient.get<JobOfferModelServer>(this.SERVER_URL +'/jobOffer/' + id);
    
  };

  postJobOffer( data: any): Observable <JobOfferModelServer> {
    return this.httpClient.post<JobOfferModelServer>(this.SERVER_URL + '/jobOffer', data,)
  }

  deleteJobOffer(id: number): Observable <JobOfferModelServer> {
    return this.httpClient.delete<JobOfferModelServer>(this.SERVER_URL + '/jobOffer/' + id);
  }
  
  editJobOffer(id: number, data: any): Observable <JobOfferModelServer> {
    return this.httpClient.put<JobOfferModelServer>(this.SERVER_URL + '/jobOffer/' + id, data)
  };
}