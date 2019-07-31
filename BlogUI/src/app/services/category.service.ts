import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CategoryModel } from '../models/CategoryModel';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    baseUrl: string = "https://localhost:5001";
    token: string = localStorage.getItem("blogToken");

    constructor(private httpClient: HttpClient) { }

    GetCategories(active: boolean, name: string) {
        const headerContent = new HttpHeaders().set("Authorization", "Bearer " + this.token);

        let param: any = {
            "active": active,
            "name": name
        }

        return this.httpClient.get(this.baseUrl + '/Admin/Category', { params: param, headers: headerContent });
    }

    GetBlogCategories() {
        return this.httpClient.get(this.baseUrl + '/Category');
    }


    PostCategory(categoryName: string) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', "application/json")
            .set("Authorization", "Bearer " + this.token);

        return this.httpClient.post(this.baseUrl + '/Admin/Category', JSON.stringify(categoryName), { headers: headerContent, observe: 'body' });
    }

    PutCategory(category: CategoryModel) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer " + this.token);

        return this.httpClient.put(this.baseUrl + '/Admin/Category', category, { headers: headerContent, observe: 'body' });
    }

    DeleteCategory(id: number) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer " + this.token);

        return this.httpClient.delete(this.baseUrl + '/Admin/Category/' + id, { headers: headerContent, observe: 'body' });
    }

    GetCategory(categoryId: number) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'applicaiton/json')
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer " + this.token);

        return this.httpClient.get<CategoryModel>(this.baseUrl + "/Admin/Category/" + categoryId, { headers: headerContent, observe: 'body' });
    }
}
