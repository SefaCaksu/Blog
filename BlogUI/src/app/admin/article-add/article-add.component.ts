import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service.';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {

  constructor(private jwt : JwtService, private router: Router) {
    if (this.jwt.TokenControl === false) {
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
  }

}
