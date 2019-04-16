import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryModel } from '../models/CategoryModel';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    baseUrl: string = "https://localhost:5001";
    constructor(private httpClient: HttpClient) {}

    GetCategories(active: boolean, name:string ) {
        let param:any = {
            "active":active,
            "name":name
        }
        
        return this.httpClient.get(this.baseUrl + '/Admin/Category',{params:param});
    }

    PostCategory(category: CategoryModel) {
        const headerContent = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', "application/json");
        return this.httpClient.post(this.baseUrl + '/Admin/Category', category, { headers: headerContent, observe: 'body' });
    }
}
