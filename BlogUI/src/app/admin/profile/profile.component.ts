import { Component, OnInit } from '@angular/core';
import { ProfileModel } from 'src/app/models/ProfileModel';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService, private toastr: ToastrService) { }

  profile = new ProfileModel();

  ngOnInit() {
    this.profileService.GetProfile().subscribe(
      (res: any) => {
        if (res.IsSuccess == true) {
          this.profile = res.Result;
        } else {
          console.log(res)
        }
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

  onSubmit() {
    this.profileService.PostProfile(this.profile).subscribe(
      (res: any) => {
        if (res.IsSuccess == true) {
          this.toastr.success("Profil başarıyla düzenlendi.", 'Başarılı');
        } else {

        }
      },
      (e) => {
        var er = e.error.Error;

        if (er.ValidationErrors != null) {
          er.ValidationErrors.forEach(function (value) {
            this.toastr.error(value.Field, value.Message);
          });
        }
        this.toastr.error(er.Message, er.Details);
      });
  }
}
