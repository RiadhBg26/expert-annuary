import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { CompanyModelServer, CompanyResponse } from '../../models/companyModel';
import { CompanyResponseData } from '../components/register-company/register-company.component';
import { CompanyLoginResponse } from '../components/login-company/login-company.component';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({

  providedIn: 'root'
})
export class CompanyService {

  private SERVER_URL = environment.SERVER_URL
  constructor(private httpClient: HttpClient, private router: Router) { }

  // get all companies
  getCompanies(numberOfResults = 10): Observable<CompanyResponse> {
    return this.httpClient.get<CompanyResponse>(this.SERVER_URL + '/company', {
      params: {
        limits: numberOfResults.toString()
      }
    });
  };
  //get single company
  getSingleCompany(id: number): Observable<CompanyModelServer> {
    return this.httpClient.get<CompanyModelServer>(this.SERVER_URL + '/company/' + id);
  };
  // REGISTER COMPANY
  registerCompany(data: any): Observable<CompanyResponseData> {
    // console.log({ data });
    return this.httpClient.post<CompanyResponseData>(`${this.SERVER_URL}/company/register`, data, httpOptions)
  }

  // delete company
  deleteCompany(id: number): Observable<CompanyModelServer> {
    return this.httpClient.delete<CompanyModelServer>(this.SERVER_URL + '/company/' + id);
  }
  //EDIT EXPERT'S IMAGE
  addImage(id: number, data: any): Observable<any> {
    // console.log('uploaded image: ',data)
    return this.httpClient.put<any>(this.SERVER_URL + '/company/' + [id + '/img'], data)
  };
  
    //EDIT EXPERT'S IMAGE
    addGallery(id: number, data: any): Observable<any> {
      // console.log('uploaded gallery',data)
      return this.httpClient.put<any>(this.SERVER_URL + '/company/' + [id + '/imgs'], data)
    };
  // edit company
  editCompany(id: number, data: any): Observable<CompanyModelServer> {
    console.log('dta2',data)
    return this.httpClient.put<CompanyModelServer>(this.SERVER_URL + '/company/' + id, data, httpOptions)
  };

  // LOGIN EXPERT
  companyLogin(data: any): Observable<CompanyLoginResponse> {
    return this.httpClient.post<CompanyLoginResponse>(`${this.SERVER_URL}/company/signin`, data, httpOptions)
  }




  // ERROR HANDLING
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}