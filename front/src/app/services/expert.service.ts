import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ExpertModelServer, ExpertResponse } from '../../models/expertModel';
import { ExpertLoginResponse } from '../components/login-expert/login-expert.component';
import { ResponseData } from '../components/register-expert/register-expert.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  private SERVER_URL = environment.SERVER_URL
  private expertModelServer: ExpertModelServer[];

  loggedExpert = null || JSON.parse(localStorage.getItem('Connected experts')) || [];
  storedExperts = JSON.parse(localStorage.getItem('Registred experts')) || [];

  constructor(private httpClient: HttpClient, private router: Router) {

    //----------------------------------------------candidates-------------------------------------------
    if (localStorage.getItem("Connected experts") || localStorage.getItem("Connected experts") !== 'null') {
      this.loggedExpert = JSON.parse(localStorage.getItem("Connected experts"));
    } else {
      this.loggedExpert = null;
    }
  }

  registerUser(registrationForm) {
    this.storedExperts.push(registrationForm);
    localStorage.setItem('Registred experts', JSON.stringify(this.storedExperts));
  }

  activeUser(loginForm) {
    if (localStorage.getItem("Connected expert") || localStorage.getItem("Connected expert") !== 'null') {
      this.loggedExpert = JSON.parse(localStorage.getItem("Connected expert"));
    } else {
      this.loggedExpert = null;
    }

    for (let i = 0; i < this.storedExperts.length; i++) {
      if (this.storedExperts[i].email == loginForm.get("email").value && this.storedExperts[i].password == loginForm.get("password").value)
        this.loggedExpert = this.storedExperts[i];
      localStorage.setItem('Connected expert', JSON.stringify(this.loggedExpert));
    }
  }




  /* ____________________________API ROUTES_________________________________________ */

  // GET ALL EXPERTS
  getExperts(numberOfResults = 10): Observable<ExpertResponse> {
    return this.httpClient.get<ExpertResponse>(this.SERVER_URL + '/experts', {
      params: {
        limits: numberOfResults.toString()
      }
    });
  };

  //get single Expert
  getSingleExpert(id: number): Observable<ExpertModelServer> {
    return this.httpClient.get<ExpertModelServer>(this.SERVER_URL + '/experts/' + id);

  };

  // REGISTER EXPERT
  registerExpert(data: any): Observable<ResponseData> {
    // console.log({ data });
    return this.httpClient.post<ResponseData>(`${this.SERVER_URL}/experts/signup`, data, httpOptions)
  }

  //DELETE EXPERT
  deleteExpert(id: number): Observable<ExpertModelServer> {
    return this.httpClient.delete<ExpertModelServer>(this.SERVER_URL + '/experts/' + id);
  }

  //EDIT EXPERT'S IMAGE
  addImage(id: number, data: any, image?: any): Observable<ExpertModelServer> {
    return this.httpClient.put<ExpertModelServer>(this.SERVER_URL + '/experts/' + [id + '/img'], data)
  };
  //EDIT EXPERT'S IMAGE
  uploadDoc(id: number, data: any): Observable<any> {
    // console.log('uploaded gallery',data)
    return this.httpClient.put<any>(this.SERVER_URL + '/experts/' + [id + '/doc'], data)
  };
  //EDIT EXPERT
  editExpert(id: number, data: any, image?: any): Observable<ExpertModelServer> {
    return this.httpClient.put<ExpertModelServer>(this.SERVER_URL + '/experts/' + id, data, httpOptions)
  };


  // LOGIN EXPERT
  expertLogin(data: any): Observable<ExpertLoginResponse> {
    return this.httpClient.post<ExpertLoginResponse>(`${this.SERVER_URL}/experts/login`, data)
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
