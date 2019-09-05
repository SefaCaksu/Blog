import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { ArticleModel } from '../models/ArticleParamsModel';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: ArticleModel[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService) { }

  ngOnInit() {
    let pageSplit = this.router.url.split("/");
    let page = pageSplit[1];
    if (page) {
      if (page == "code") {
        this.GetArticleList(0);
      } else if (page == "fincandibi") {
        this.GetArticleList(1);
      } else if (page == "tags") {
        this.route.params.subscribe(param=>{
          this.GetArticleList(2, param.id, null)
        });
      } else if (page == "categories") {
        this.route.params.subscribe(param=>{
          this.GetArticleList(2, null, param.id)
        });
      }
    }
  }

  GetArticleList(type: number, tagId?: number, categoryId?: number) {
    this.articleService.GetBlogArticles("", 1, 0, type, categoryId, tagId).subscribe((res: any) => {
      if (res.IsSuccess == true) {
        this.articles = res.Result;
      }
    });
  }
}
