import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TagModel } from '../models/TagModel';
import { JwtService } from './jwt.service.';

@Injectable({ providedIn: 'root' })
export class TagService {
    baseUrl: string = "https://localhost:5001";
    token: string = localStorage.getItem("blogToken");
    constructor(private httpClient: HttpClient) { }

    GetTags(active: boolean, name: string) {
        const headerContent = new HttpHeaders()
        .set("Authorization", "Bearer " + this.token);

        let param: any = {
            "active": active,
            "name": name
        }

        return this.httpClient.get(this.baseUrl + '/Admin/Tag', { params: param,  headers: headerContent });
    }

    GetBlogTags() {
        return this.httpClient.get(this.baseUrl + '/Tag');
    }

    PostTag(tagName: string) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', "application/json")
            .set("Authorization", "Bearer " + this.token);
        return this.httpClient.post(this.baseUrl + '/Admin/Tag', JSON.stringify(tagName), { headers: headerContent, observe: 'body' });
    }

    PutTag(tag: TagModel) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer " + this.token);

        return this.httpClient.put(this.baseUrl + '/Admin/Tag', tag, { headers: headerContent, observe: 'body' });
    }

    DeleteTag(id:number) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer " + this.token);

        return this.httpClient.delete(this.baseUrl + '/Admin/Tag/' + id, { headers: headerContent, observe: 'body' });
    }

    GetTag(tagId: number) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'applicaiton/json')
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer " + this.token);

        return this.httpClient.get<TagModel>(this.baseUrl + "/Admin/Tag/" + tagId , { headers: headerContent, observe: 'body' });
    }
}
