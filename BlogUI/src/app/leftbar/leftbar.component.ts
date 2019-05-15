import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt.service.';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {

  constructor(private jwt : JwtService, private router: Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.jwt.Logout();
    this.router.navigate(['login']);
  }
}
