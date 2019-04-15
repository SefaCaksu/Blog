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
 categories:Array<CategoryModel>;

  ngOnInit() {
    this.categoryService.GetCategories().subscribe(
      (res : any) => {
        if(res.IsSuccess == true){
          this.categories = res.Result;
        }

        console.log(this.categories);

      }
    )
  }

}
