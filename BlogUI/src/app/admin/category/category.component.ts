import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }
  categories: CategoryModel[];

  ngOnInit() {
    this.categoryService.GetCategories(true, "").subscribe(
      (res: any) => {
        if (res.IsSuccess == true) {
          this.categories = res.Result;
        }
      },
      e=>{
        var er = e.error.Error;

        if (er.ValidationErrors != null) {
          er.ValidationErrors.forEach(function (value) {
            this.toastr.error(value.Field, value.Message);
          });
        }

        this.toastr.error(er.Message, er.Details);
      }
    )
  }
}
