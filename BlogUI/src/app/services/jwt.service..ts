import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})

export class JwtService {

  baseUrl: string = "https://localhost:5001";
  constructor(private httpclient: HttpClient) { }

  GetToken(user: UserModel) {
    const headerContent = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    return this.httpclient.post(this.baseUrl + '/Token', user, { headers: headerContent, observe: 'body' });
  }

  Logout() {
    localStorage.removeItem('blogToken');
  }

  public get TokenControl(): boolean {
    return (localStorage.getItem('blogToken') !== null);
  }
}
