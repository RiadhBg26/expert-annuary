import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillModelServer, SkillResponse } from '../../models/skillModel';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private SERVER_URL = environment.SERVER_URL
  constructor(private httpClient: HttpClient, private router: Router,
    ) { }

    getSkills(): Observable<SkillResponse> {
    return this.httpClient.get<SkillResponse>(this.SERVER_URL + '/skill')
  };

  //get single Expert
  getSingleSkill(id: number): Observable <SkillModelServer> {
    return this.httpClient.get<SkillModelServer>(this.SERVER_URL +'/skill/' + id);
    
  };

  postSkill( data: any): Observable <any> {
    return this.httpClient.post<any>(this.SERVER_URL + '/skill', data,)
  }

  deleteSkill(id: number): Observable <SkillModelServer> {
    return this.httpClient.delete<SkillModelServer>(this.SERVER_URL + '/skill/' + id);
  }
  
  editSkill(id: number, data: any): Observable <SkillModelServer> {
    return this.httpClient.put<SkillModelServer>(this.SERVER_URL + '/skill/' + id, data)
  };

}