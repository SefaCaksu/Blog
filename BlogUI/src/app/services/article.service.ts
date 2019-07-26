import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ArticleModel } from '../models/ArticleParamsModel';

@Injectable({ providedIn: 'root' })
export class ArticleService {
    baseUrl: string = "https://localhost:5001";
    token: string = localStorage.getItem("blogToken");

    constructor(private httpClient: HttpClient) { }

    PostArticle(formData: FormData) {
        const headerContent = new HttpHeaders().set("Authorization", "Bearer " + this.token);

        return this.httpClient.post(this.baseUrl + '/Admin/Article', formData, { headers: headerContent, observe: 'body' });
    }

    PutArticle(formData: FormData) {
        const headerContent = new HttpHeaders().set("Authorization", "Bearer " + this.token);

        return this.httpClient.put(this.baseUrl + '/Admin/Article', formData, { headers: headerContent, observe: 'events' });
    }

    GetArticle(articleId: number) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'applicaiton/json')
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer " + this.token);

        return this.httpClient.get<ArticleModel>(this.baseUrl + "/Admin/Article/" + articleId, { headers: headerContent, observe: 'body' });
    }


    GetArticles(title: string, page: number, rowCount: number, categoryId?: number, tagId?: number) {
        const headerContent = new HttpHeaders().set("Authorization", "Bearer " + this.token);

        let param: any = {
            "title": title,
            "page": page,
            "rowCount": rowCount,
            "categoryId": categoryId == null ? 0 : categoryId,
            "tagId": tagId == null ? 0 : tagId
        }

        return this.httpClient.get(this.baseUrl + '/Admin/Article', { params: param, headers: headerContent });
    }

    GetArticleCount(title: string, categoryId?: number, tagId?: number) {
        const headerContent = new HttpHeaders().set("Authorization", "Bearer " + this.token);

        let param: any = {
            "title": title,
            "categoryId": categoryId == null ? 0 : categoryId,
            "tagId": tagId == null ? 0 : tagId
        }

        return this.httpClient.get(this.baseUrl + '/Admin/ArticleCount', { params: param, headers: headerContent });
    }

}