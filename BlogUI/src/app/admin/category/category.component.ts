import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/models/CategoryModel';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }
  categories:CategoryModel[];

  ngOnInit() {
    this.categoryService.GetCategories(true,"").subscribe(
      (res : any) => {
        if(res.IsSuccess == true){
           this.categories = res.Result;
        }
      }
    )
  }
}
