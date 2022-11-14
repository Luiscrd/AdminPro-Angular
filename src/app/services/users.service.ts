import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { Observable, of, tap } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const base_url = environment.base_url;

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public user: User;

  constructor(

    private http: HttpClient,

    private router: Router,

    private ngZone: NgZone

  ) { }

  logout() {

    localStorage.removeItem('adminProJWT');

    google.accounts.id.revoke(localStorage.getItem('email'), () => {

      this.ngZone.run(() =>{

        this.router.navigateByUrl('/login');

      })



      if(localStorage.getItem('rec') != 'true') localStorage.removeItem('email');

    })

  }

  validateToken(): Observable<boolean> {

    const token = localStorage.getItem('adminProJWT') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'jwt': token
      }
    }).pipe(
      tap(resp => {
        localStorage.setItem('adminProJWT', resp['jwt']);
        const { email, google, name, role, img, uid } = resp['user'];
        // console.log({ email, google, name, role, img, uid });
        this.user = new User(name, email, '', img, google, role, uid );
        // console.log(this.user);
      }),
      map(resp => true),
      catchError(err => of(false))
    )

  }

  createUser( formData: RegisterForm ) {

    return this.http.post(`${base_url}/users`, formData);

  }

  loginUser( formData: LoginForm ) {

    return this.http.post(`${base_url}/login`, formData);

  }

  loginGoogle( jwt: string ) {

    return this.http.post(environment.urlBackEnd, { jwt });

  }
}
