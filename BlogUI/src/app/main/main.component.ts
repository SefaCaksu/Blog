import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ArticleModel } from '../models/ArticleParamsModel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  techArticles: ArticleModel[];
  cupArticles: ArticleModel[];
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.GetArticleList(0);
    this.GetArticleList(1);
  }

  GetArticleList(type: number) {
    this.articleService.GetBlogArticles("", 1, 4, type, null, null).subscribe((res: any) => {
      if (res.IsSuccess == true) {
        if (type == 0) {
          this.techArticles = res.Result;
        } else {
          this.cupArticles = res.Result;
        }
      }
    });
  }

}
