import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(gidilecekSayfa: ActivatedRouteSnapshot, gelinenSayfa: RouterStateSnapshot): boolean {
    console.log(localStorage.getItem('blogToken'));
      if (localStorage.getItem('blogToken') !== null)
          return true;
           
      this.router.navigate(["login"]);
      return false;
  }
}
