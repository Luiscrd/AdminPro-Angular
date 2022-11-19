import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(

    private usersService: UsersService,

    private router: Router

  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if (this.usersService.role === 'ADMIN_ROLE') {

        return true;

      } else {

        this.router.navigateByUrl('/dashboard/main');

        return false;

      }

  }

}
