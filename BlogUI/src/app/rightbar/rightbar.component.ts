import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ProfileModel } from '../models/ProfileModel';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.css']
})
export class RightbarComponent implements OnInit {

  profile = new ProfileModel();
  technicalCount : number = 0;
  cupCount : number = 0;

  constructor(private profileService: ProfileService, private articleService: ArticleService) { }

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

  GetArticleTypeCount(){
    this.articleService.GetArticleTypeCount().subscribe((res: any)=>{
      if(res.IsSuccess == true){
        var data = res.Result;
        this.technicalCount = data.TechnicalCount;
        this.cupCount = data.CupCount;
      }
    });
  }

}
