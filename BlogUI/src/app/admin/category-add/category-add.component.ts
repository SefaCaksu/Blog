import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from 'src/app/services/category.service';
import {CategoryModel} from 'src/app/models/CategoryModel';

@Component({
    selector : 'app-category-add',
    templateUrl : './category-add.component.html',
    styles : ['./category-add.component.css']
})

export class CategoryAddComponent implements OnInit{
    constructor(private activeRoute: ActivatedRoute, private categoryService: CategoryService){}

    category = new CategoryModel();
    title : string ;
    ngOnInit(){
        const queryParams = this.activeRoute.snapshot.queryParams;
        const routeParams = this.activeRoute.snapshot.params;
        this.title= "Kategori Ekle";
        // queryParams.array.forEach(element => {
        //     console.log(element);
        // });

        // routeParams.foreach(function(item){
        //     console.log(item);

        // })
    }
}
