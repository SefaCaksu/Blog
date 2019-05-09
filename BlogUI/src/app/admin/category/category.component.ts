import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ToastrService } from 'ngx-toastr';
import { CategoryFilterModel } from 'src/app/models/CategoryFilterModel';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }
  categories: CategoryModel[];
  category = new CategoryModel();
  filter = new CategoryFilterModel();
  submitButton: string;



  ngOnInit() {
    this.submitButton = "Kategori Ekle";
    this.List("", true);
  }

  onFilter() {
    if (this.filter != null && this.filter != undefined) {
      let statu = this.filter.filterStatus == "1";
      this.List(this.filter.filterName, statu);
    }
  }

  onSubmit() {
    if (this.category.Id > 0) {
      this.categoryService.PutCategory(this.category).subscribe(
        (res: any) => {
          if (res.IsSuccess == true) {
            this.toastr.success("Kategori başarıyla düzenlendi.", 'Başarılı');
            this.List("", true);
          } else {

          }
        },
        (e) => {
          var er = e.error.Error;
          if (er.ValidationErrors != null) {
            er.ValidationErrors.forEach(function (value) {
              this.toastr.error(value.Field, value.Message);
            });
          }
          this.toastr.error(er.Message, er.Details);
        });
    } else {
      this.categoryService.PostCategory(this.category.Name).subscribe(
        (res: any) => {
          if (res.IsSuccess == true) {
            this.toastr.success("Kategori başarıyla eklendi.", 'Başarılı');
            this.List("", true);
          } else {

          }
        },
        (e) => {
          var er = e.error.Error;
          if (er.ValidationErrors != null) {
            er.ValidationErrors.forEach(function (value) {
              this.toastr.error(value.Field, value.Message);
            });
          }
          this.toastr.error(er.Message, er.Details);
        });
    }
  }

  onEdit(id: number) {
    $('#categoryDeleteModal').modal('show');
    this.categoryService.GetCategory(id).subscribe(
      (res: any) => {
        if (res.IsSuccess == true) {
          this.submitButton = "Kategori Düzenle";
          this.category = res.Result;
        } else { };
      },
      (e) => {
        var er = e.error.Error;
        if (er.ValidationErrors != null) {
          er.ValidationErrors.forEach(function (value) {
            this.toastr.error(value.Field, value.Message);
          });
        }
        this.toastr.error(er.Message, er.Details);
      }
    );
  }

  onCancel() {
    this.category.Id = 0;
    this.category.Name = "";
    this.category.Active = true;
    this.submitButton = "Kategori Ekle";
  }

  List(name: string, active: boolean) {
    this.categoryService.GetCategories(active, name).subscribe(
      (res: any) => {
        if (res.IsSuccess == true) {
          this.categories = res.Result;
        }
      },
      e => {
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
