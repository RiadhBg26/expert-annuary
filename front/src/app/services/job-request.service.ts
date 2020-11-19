import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobRequestModelServer, JobRequestResponse } from '../../models/jobRequestModel';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class JobRequestService {

  private SERVER_URL = environment.SERVER_URL
  constructor(private httpClient: HttpClient, private router: Router,
    ) { }

    getjobRequests(): Observable<JobRequestResponse> {
    return this.httpClient.get<JobRequestResponse>(this.SERVER_URL + '/jobRequest')
  };

  //get single Expert
  getSingleJobRequest(id: number): Observable <JobRequestModelServer> {
    return this.httpClient.get<JobRequestModelServer>(this.SERVER_URL +'/jobRequest/' + id);
    
  };

  postJobRequest( data: any): Observable <JobRequestModelServer> {
    return this.httpClient.post<JobRequestModelServer>(this.SERVER_URL + '/jobRequest', data,)
  }

  deleteJobRequest(id: number): Observable <JobRequestModelServer> {
    return this.httpClient.delete<JobRequestModelServer>(this.SERVER_URL + '/jobRequest/' + id);
  }
  
  editJobRequest(id: number, data: any): Observable <JobRequestModelServer> {
    return this.httpClient.put<JobRequestModelServer>(this.SERVER_URL + '/jobRequest/' + id, data)
  };

}