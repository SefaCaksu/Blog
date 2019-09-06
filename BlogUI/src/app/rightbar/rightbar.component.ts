import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ProfileModel } from '../models/ProfileModel';
import { ArticleService } from '../services/article.service';
import { NewsService } from '../services/news.service';
import { ToastrService } from 'ngx-toastr';
import { NewsModel } from '../models/NewsModel';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.css']
})
export class RightbarComponent implements OnInit {

  profile = new ProfileModel();
  technicalCount: number = 0;
  cupCount: number = 0;
  news = new NewsModel();

  constructor(
    private profileService: ProfileService,
    private articleService: ArticleService,
    private newsService: NewsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.GetProfile();
    this.GetArticleTypeCount();
  }

  GetProfile() {
    this.profileService.GetBlogProfile().subscribe((res: any) => {
      if (res.IsSuccess == true) {
        this.profile = res.Result;
      }
    });
  }

  GetArticleTypeCount() {
    this.articleService.GetArticleTypeCount().subscribe((res: any) => {
      if (res.IsSuccess == true) {
        var data = res.Result;
        this.technicalCount = data.TechnicalCount;
        this.cupCount = data.CupCount;
      }
    });
  }

  onSubmitNews() {
    this.newsService.PostTag(this.news.Email).subscribe((res: any) => {
      if (res.IsSuccess == true) {
        console.log(res.Result);
        if (res.Result > 0) {
          this.toastr.success("İlgin için teşekkür ederim. :D", "Başarılı");
        } else {
          this.toastr.error("E-posta formatın yalnış. :(", "Üzgünüm");
        }
      }
    });
  }

}
