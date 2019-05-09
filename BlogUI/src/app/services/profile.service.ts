import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileModel } from '../models/ProfileModel';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl: string = "https://localhost:5001";
  constructor(private httpclient: HttpClient) {

  }

  GetProfile() {
    return this.httpclient.get(this.baseUrl + '/Admin/Profile');
  }

  PostProfile(profile: ProfileModel) {
    const headerContent = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
    return this.httpclient.post(this.baseUrl + '/Admin/Profile', profile, { headers: headerContent, observe: 'body' });
  }
}
