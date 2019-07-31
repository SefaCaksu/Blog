import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt.service.';
import { Router } from '@angular/router';
import { TagService } from '../services/tag.service';
import { TagModel } from '../models/TagModel';
import { CategoryService } from '../services/category.service';
import { CategoryModel } from '../models/CategoryModel';
import { ProfileModel } from '../models/ProfileModel';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {

  tags: TagModel[];
  categories: CategoryModel[];

  constructor(
    private jwt: JwtService,
    private router: Router,
    private tagService: TagService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.GetTagList();
    this.GetCategoryList();
  }

  onLogout() {
    this.jwt.Logout();
    this.router.navigate(['login']);
  }

  GetTagList() {
    this.tagService.GetBlogTags().subscribe((res: any) => {
      if (res.IsSuccess == true) {
        this.tags = res.Result;
      }
    });
  }

  GetCategoryList() {
    this.categoryService.GetBlogCategories().subscribe((res: any) => {
      if (res.IsSuccess == true) {
        this.categories = res.Result;
      }
    });
  }
}
