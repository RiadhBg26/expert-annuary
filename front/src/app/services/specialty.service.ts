import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpecialityResponse, SpecialityModelServer } from '../../models/specialtyModel';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  private SERVER_URL = environment.SERVER_URL

  private SpecialtyModelServer: SpecialityModelServer[];

  // httpOptions = {
  //   headers: new HttpHeaders({        
  //     'Accept': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Content-Type': 'multipart/form-data' 
  //   })
  // }

  constructor(private httpClient: HttpClient, private router: Router,
    ) { }

    getSpecialities(): Observable<SpecialityResponse> {
    return this.httpClient.get<SpecialityResponse>(this.SERVER_URL + '/specialty')
  };

  //get single Expert
  getSingleSpeciality(id: number): Observable <SpecialityModelServer> {
    return this.httpClient.get<SpecialityModelServer>(this.SERVER_URL +'/specialty/' + id);
    
  };

  postSpeciality( data: any): Observable <any> {
    return this.httpClient.post<any>(this.SERVER_URL + '/specialty', data, httpOptions)
  }

  deleteSpeciality(id: number): Observable <SpecialityModelServer> {
    return this.httpClient.delete<SpecialityModelServer>(this.SERVER_URL + '/specialty/' + id);
  }
  
  editSpeciality(id: number, data: any): Observable <SpecialityModelServer> {
    return this.httpClient.put<SpecialityModelServer>(this.SERVER_URL + '/specialty/' + id, data)
  };

}