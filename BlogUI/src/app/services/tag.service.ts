import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TagModel } from '../models/TagModel';

@Injectable({ providedIn: 'root' })
export class TagService {
    baseUrl: string = "https://localhost:5001";
    constructor(private httpClient: HttpClient) { }

    GetTags(active: boolean, name: string) {
        let param: any = {
            "active": active,
            "name": name
        }

        return this.httpClient.get(this.baseUrl + '/Admin/Tag', { params: param });
    }

    PostTag(tagName: string) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', "application/json");
        return this.httpClient.post(this.baseUrl + '/Admin/Tag', JSON.stringify(tagName), { headers: headerContent, observe: 'body' });
    }

    PutTag(tag: TagModel) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        return this.httpClient.put(this.baseUrl + '/Admin/Tag', tag, { headers: headerContent, observe: 'body' });
    }

    DeleteTag(id:number) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        return this.httpClient.delete(this.baseUrl + '/Admin/Tag/' + id, { headers: headerContent, observe: 'body' });
    }

    GetTag(tagId: number) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'applicaiton/json')
            .set('Accept', 'application/json');

        return this.httpClient.get<TagModel>(this.baseUrl + "/Admin/Tag/" + tagId , { headers: headerContent, observe: 'body' });
    }
}
