import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NewsService {
    baseUrl: string = "https://localhost:5001";
    token: string = localStorage.getItem("blogToken");
    constructor(private httpClient: HttpClient) { }

    PostTag(email: string) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', "application/json")
        return this.httpClient.post(this.baseUrl + '/News', JSON.stringify(email), { headers: headerContent, observe: 'body' });
    }
}
