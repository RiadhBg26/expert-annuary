
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatModelServer, ChatResponse } from '../../models/chatModel';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private SERVER_URL = environment.SERVER_URL
  constructor(private httpClient: HttpClient, private router: Router,
  ) { }

  getChats(): Observable<ChatResponse> {
    return this.httpClient.get<ChatResponse>(this.SERVER_URL + '/chat')
  };

  //get single Expert
  getSingleChat(id: number): Observable<ChatModelServer> {
    return this.httpClient.get<ChatModelServer>(this.SERVER_URL + '/chat/' + id);

  };

  postChat(data: any): Observable<ChatModelServer> {
    return this.httpClient.post<ChatModelServer>(this.SERVER_URL + '/chat', data, httpOptions)
  }

  deleteChat(id: number): Observable<ChatModelServer> {
    return this.httpClient.delete<ChatModelServer>(this.SERVER_URL + '/chat/' + id);
  }

  editChat(id: number, data: any): Observable<ChatModelServer> {
    return this.httpClient.put<ChatModelServer>(this.SERVER_URL + '/chat/' + id, data, httpOptions)
  };
}