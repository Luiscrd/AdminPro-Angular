import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(

    private userService: UsersService,

    private router: Router

  ) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.userService.validateToken().pipe(
      tap(isahuth => {
        if (!isahuth) this.router.navigateByUrl('/login');
      })
    );

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.userService.validateToken().pipe(
      tap(isahuth => {
        if (!isahuth) this.router.navigateByUrl('/login');
      })
    );

  }

}
