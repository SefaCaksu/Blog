import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
}
