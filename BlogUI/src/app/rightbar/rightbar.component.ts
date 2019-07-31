import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ProfileModel } from '../models/ProfileModel';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.css']
})
export class RightbarComponent implements OnInit {

  profile = new ProfileModel();

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.GetProfile();
  }

  GetProfile() {
    this.profileService.GetBlogProfile().subscribe((res: any) => {
      if (res.IsSuccess == true) {
        this.profile = res.Result;
        console.log(this.profile);
      }
    });
  }

}
