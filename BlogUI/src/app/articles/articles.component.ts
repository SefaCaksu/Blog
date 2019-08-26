import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { ArticleModel } from '../models/ArticleParamsModel';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles : ArticleModel[];
  constructor(private router: Router, private articleService: ArticleService) { }

  ngOnInit() {
    let ty = this.router.url == "/code" ? 0 : 1;
    this.GetArticleList(ty);
  }

  GetArticleList(type: number) {
    this.articleService.GetBlogArticles("", 1, 0, type, null, null).subscribe((res: any) => {
      if (res.IsSuccess == true) {
       this.articles = res.Result;
      }
    });
  }
}
