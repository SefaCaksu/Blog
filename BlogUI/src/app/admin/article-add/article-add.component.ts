import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service.';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { TagService } from 'src/app/services/tag.service';
import { ArticleParamsModel } from 'src/app/models/ArticleParamsModel';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ToastrService } from 'ngx-toastr';
import { TagModel } from 'src/app/models/TagModel';


@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {
  article={};
  categories : CategoryModel[];
  dropdownSettings = {};
  tags = [];
  selectedItems : TagModel[];
  file :any;
  

  constructor(private jwt: JwtService, private router: Router, private articleService: ArticleService, private categoryService: CategoryService, private tagService: TagService, private toastr: ToastrService) {
    if (this.jwt.TokenControl === false) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.categoryService.GetCategories(true, "").subscribe(
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
      })

      this.tagService.GetTags(true, "").subscribe(
        (res: any) => {
          if (res.IsSuccess == true) {
            this.tags = res.Result;
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
        })

        this.dropdownSettings = {
          singleSelection: false,
          idField: 'Id',
          textField: 'Name',
          selectAllText: 'Tümünü Seç',
          unSelectAllText: 'Tümünü Kaldır',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
    
  }

  onSubmit(files){
    let fileToUpload = <File>files[0];
    var formdata = new FormData();
    formdata.append("file", fileToUpload);
    formdata.append("DtoArticleParams", JSON.stringify(this.article));
    this.articleService.PostArticle(formdata).subscribe(
      (res: any) => {
        if (res.IsSuccess == true) {
          this.tags = res.Result;
        }
      }
     )
  }

}
