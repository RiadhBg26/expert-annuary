import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ExpertProfileModel } from '../../models/expertProfileModel';
import { ExpertLoginResponse } from '../components/login-expert/login-expert.component';
import { ResponseData } from '../components/register-expert/register-expert.component';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private SERVER_URL = environment.SERVER_URL

  constructor(private httpClient: HttpClient, private router: Router) { }

  saveProfile(data:any): Observable<ExpertProfileModel> { 
    console.log({data});
    return this.httpClient.post<ExpertProfileModel>(`${this.SERVER_URL}/exprofile`, {data}, httpOptions)
  }
}
