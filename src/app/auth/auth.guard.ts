import {Injectable} from "@angular/core";
import {LoginService} from "./login.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate{
  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
      Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {

    if (state.url.includes("/admin")) {
      return this.canActivateAdmin();
    } else if (state.url.includes("/user")) {
      return this.canActivateUser();
    }

    return this.router.createUrlTree(['/login']);

  }

  canActivateUser(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isLogged && !this.loginService.isAdmin){
      return true;
    }

    // this.loginService.isAdmin = false;
    // this.loginService.isLogged = false;
    return this.router.createUrlTree(['/login']);
  }

  canActivateAdmin(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    if(this.loginService.isLogged && this.loginService.isAdmin){
      return true;
    }

    // this.loginService.isAdmin = false;
    // this.loginService.isLogged = false;
    return this.router.createUrlTree(['/login']);
  }



}
