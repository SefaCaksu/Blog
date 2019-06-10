import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service.';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  constructor(private jwt : JwtService, private router: Router) {
    if (this.jwt.TokenControl === false) {
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
  }

}
