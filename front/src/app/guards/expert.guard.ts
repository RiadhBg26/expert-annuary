import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationService } from '../services/registration.service';
import { ExpertService } from '../services/expert.service';


@Injectable({
  providedIn: 'root'
})
export class ExpertGuard implements CanActivate {
  constructor(private expertService : ExpertService, private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loggedIn = this.expertService.loggedExpert;
      // console.log(loggedIn);
      if (loggedIn == null) {
        alert('User Guard');
        this.router.navigateByUrl('/exlogin')
        return false;
      }
        return true

  }
  
}
