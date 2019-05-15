import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt.service.';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private jwt : JwtService, private router: Router) { }

  ngOnInit() {
    if (this.jwt.TokenControl === false) {
      this.router.navigate(['login']);
    }
  }

}
