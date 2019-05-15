import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../models/UserModel';
import { JwtService } from '../services/jwt.service.';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private jwt: JwtService, private toastr: ToastrService, private router: Router) { }

  user = new UserModel();

  ngOnInit() {
    if(this.jwt.TokenControl === true){
      this.router.navigate(['admin']);
    }
  }

  onLogin() {
    localStorage.removeItem("blogToken");
    this.jwt.GetToken(this.user).subscribe(
      (res: any) => {
        if (res.IsSuccess == true) {
          if (res.Result == "0") {
            this.toastr.error("Giriş bilgilerini kontrol ederek, tekrar deneyiniz.", "Kullanıcı Girişi Hatalı");
          } else {
            let token = res.Result.substring(0, res.Result.length - 1).substring(1, res.Result.length);
            localStorage.setItem("blogToken", token);
            this.router.navigate(['admin']);
          }
        } else {

        }
      });
  }
}
