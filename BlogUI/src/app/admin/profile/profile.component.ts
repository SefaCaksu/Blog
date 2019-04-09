import { Component, OnInit } from '@angular/core';
import { ProfileModel } from 'src/app/models/ProfileModel';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService) { }


  profile = new ProfileModel();

  ngOnInit() {
    this.profileService.GetProfile().subscribe(
      (res: any) => {
        console.log(res);
      },
      (e)=>{
        console.log(e)
      }
      );
  }

  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.profile))
  }
}
