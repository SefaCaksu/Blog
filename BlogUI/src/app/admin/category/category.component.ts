import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ToastrService } from 'ngx-toastr';
import { CategoryFilterModel } from 'src/app/models/CategoryFilterModel';
import { JwtService } from 'src/app/services/jwt.service.';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private jwt: JwtService, private router: Router) { }
  categories: CategoryModel[];
  category = new CategoryModel();
  filter = new CategoryFilterModel();
  submitButton: string;
  deleteId: number;

  ngOnInit() {
    if (this.jwt.TokenControl === false) {
      this.router.navigate(['login']);
    } else {
      this.submitButton = "Kategori Ekle";
      this.filter.filterStatus = 1
      this.List("", true);
    }
  }

  onFilter() {
    if (this.filter != null && this.filter != undefined) {
      if (this.filter.filterName == "undefined" || this.filter.filterName == undefined) {
        this.filter.filterName = "";
      }

      this.List(this.filter.filterName, this.filter.filterStatus == 1);
    }
  }

  onSubmit() {
    if (this.category.Id > 0) {
      this.categoryService.PutCategory(this.category).subscribe(
        (res: any) => {
          if (res.IsSuccess == true) {
            this.toastr.success("Kategori başarıyla düzenlendi.", 'Başarılı');
            this.List("", this.filter.filterStatus == 1);
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

            this.List("", this.filter.filterStatus == 1);
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

  onDeleteConfirm(id) {
    $('#categoryDeleteModal').modal('show');
    $(".modal-backdrop").css("z-index", "1");
    this.deleteId = id;
  }

  onDelete() {
    this.categoryService.DeleteCategory(this.deleteId).subscribe(
      (res: any) => {
        if (res.IsSuccess == true) {
          this.toastr.success("Kategori başarıyla silindi.", 'Başarılı');
          $('#categoryDeleteModal').modal('hide');
          this.List("", this.filter.filterStatus == 1);
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
        if (er.ValidationErrors != undefined && er.ValidationErrors != null) {
          er.ValidationErrors.forEach(function (value) {
            this.toastr.error(value.Field, value.Message);
          });
        }
        this.toastr.error(er.Message, er.Details);
      }
    )
  }
}
