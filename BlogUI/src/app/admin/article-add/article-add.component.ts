import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service.';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { TagService } from 'src/app/services/tag.service';
import { ArticleModel } from 'src/app/models/ArticleParamsModel';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ToastrService } from 'ngx-toastr';
import { TagModel } from 'src/app/models/TagModel';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {
  article = new ArticleModel();
  categories: CategoryModel[];
  dropdownSettings = {};
  tags = [];
  selectedItems: TagModel[];
  file: any;
  articleId: number = 0;



  constructor(
    private jwt: JwtService,
    private router: Router,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
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

    let param = this.route.snapshot.paramMap.get("id");

    if (param != null && param != undefined) {
      this.articleId = parseInt(param);
      this.GetArticle(this.articleId);
    }
  }

  onSubmit(files) {
    this.article.Img = "";
    let fileToUpload = <File>files[0];

    let tagArr: number[] = [];
    this.selectedItems.forEach(item => {
      tagArr.push(item.Id);
    });

    this.article.TagIds = tagArr;

    var formdata = new FormData();

    if (fileToUpload != null) {
      formdata.append("file", fileToUpload);
    }

    formdata.append("DtoArticleParams", JSON.stringify(this.article));

    if (this.articleId == 0) {
      this.articleService.PostArticle(formdata).subscribe(
        (res: any) => {
          console.log(res.Result);
          this.toastr.success("Makale başarı ile kayıt altına alınmıştır.", "Başarılı");
          this.router.navigate(['/admin/articleadd', res.Result]);
        }
      )
    } else {
      this.articleService.PutArticle(formdata).subscribe(
        (res: any) => {
          this.GetArticle(this.articleId);
          this.toastr.success("Makale başarı ile düzenlenmiştir.", "Başarılı");
        }
      )
    }
  }

  GetArticle(articleId:number){
    this.articleService.GetArticle(articleId).subscribe((res: any) => {
      if (res.IsSuccess == true) {
        this.article = res.Result;
        console.log(res.Result.Tags);
        this.selectedItems = res.Result.Tags;
      }
    })
  }
}
