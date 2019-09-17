import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { ArticleModel } from '../models/ArticleParamsModel';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  article = new ArticleModel();

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param=>{
      this.GetArticle(param.id);
    });
  }

  GetArticle(id: number) {
    this.articleService.GetBlogArticle(id).subscribe((res: any) => {
      if (res.IsSuccess == true) {
        this.article = res.Result;
      }
    });
  }
}
