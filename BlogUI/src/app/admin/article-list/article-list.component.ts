import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleModel } from 'src/app/models/ArticleParamsModel';
import { CategoryService } from 'src/app/services/category.service';
import { TagService } from 'src/app/services/tag.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { TagModel } from 'src/app/models/TagModel';
declare var $: any;

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})

export class ArticleListComponent implements OnInit {
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private tagService: TagService,
    private toastr: ToastrService
  ) {}

  articles: ArticleModel[];
  categories: CategoryModel[];
  tags: TagModel[];
  filterTitle: string = '';
  filterCategoryId?: number = 0;
  filterTagId?: number = 0;
  pages: number[] = [];
  pageCount: number;
  rowCount: number = 10;
  activePage: number = 1;
  articleCount = 0;
  deleteId = 0;

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
      });

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
      });

    this.ArticleCount("", null, null);
    this.ArticleList("", null, null);
  }

  onFilter() {
    this.activePage = 1;
    this.ArticleCount(this.filterTitle, this.filterCategoryId, this.filterTagId);
    this.ArticleList(this.filterTitle, this.filterCategoryId, this.filterTagId);
  }

  onPageing(pagenumber) {
    this.activePage = pagenumber;
    this.ArticleList(this.filterTitle, this.filterCategoryId, this.filterTagId);
  }

  OnPrevious() {
    if (this.activePage > 1) {
      this.activePage = this.activePage - 1;
      this.ArticleList(this.filterTitle, this.filterCategoryId, this.filterTagId);
    }
  }

  onNext() {
    if (this.activePage < this.pageCount) {
      this.activePage = this.activePage + 1;
      this.ArticleList(this.filterTitle, this.filterCategoryId, this.filterTagId);
    }
  }

  onPageingText() {
    if (this.activePage > 0 && this.activePage <= this.pageCount) {
      this.ArticleList(this.filterTitle, this.filterCategoryId, this.filterTagId);
    }
  }

  onRowCount(){
    this.pages = [];
    this.activePage = 1;
    this.pageCount = Math.ceil(this.articleCount / this.rowCount)

    for (let i = 0; i < this.pageCount; i++) {
      this.pages.push(i + 1);
    }

    this.ArticleList(this.filterTitle, this.filterCategoryId, this.filterTagId);
  }

  onDeleteConfirm(id){
    $('#articleDeleteModal').modal('show');
    $(".modal-backdrop").css("z-index", "1");
    this.deleteId = id;
  }

  onDelete() {
    this.articleService.DeleteArticle(this.deleteId).subscribe(
      (res: any) => {
        if (res.IsSuccess == true) {
          this.toastr.success("Makale başarıyla silindi.", 'Başarılı');
          $('#articleDeleteModal').modal('hide');
          this.ArticleList(this.filterTitle, this.filterCategoryId, this.filterTagId);
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

  ArticleList(title: string, categoryId?: number, tagId?: number) {
    this.articleService.GetArticles(title, this.activePage, this.rowCount, categoryId, tagId).subscribe((res: any) => {
      if (res.IsSuccess == true) {
        this.articles = res.Result;
      }
    });
  }

  ArticleCount(title: string, categoryId?: number, tagId?: number) {
    this.articleService.GetArticleCount(title, categoryId, tagId).subscribe((res: any) => {
      if (res.IsSuccess == true) {
        this.articleCount = res.Result
        this.pageCount = Math.ceil(this.articleCount / this.rowCount)
        this.pages = [];
        for (let i = 0; i < this.pageCount; i++) {
          this.pages.push(i + 1);
        }
      }
    });
  }

}
