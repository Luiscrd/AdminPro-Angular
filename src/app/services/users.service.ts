import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { Observable, of, tap } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UpdateForm } from '../interfaces/update-form.interface';

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

  get token() {

    return localStorage.getItem('adminProJWT') || '';

  }


  logout() {

    localStorage.removeItem('adminProJWT');
    console.log(localStorage.getItem('email'));

    this.ngZone.run(() => {

      this.router.navigateByUrl('/login');

    })

    google.accounts.id.revoke(localStorage.getItem('email'), () => {

      if (localStorage.getItem('rec') != 'true') localStorage.removeItem('email');

    })

  }

  validateToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'jwt': this.token
      }
    }).pipe(
      map(resp => {
        localStorage.setItem('adminProJWT', resp['jwt']);
        const {
          email,
          google,
          name,
          role,
          img = '',
          age = 35,
          phone = '',
          country = '',
          desc = '',
          uid
        } = resp['user'];
        // console.log({ email, google, name, role, img, uid });
        this.user = new User(name, email, '', img, google, role, age, phone, country, desc, uid);
        // console.log(this.user);
        return true;
      }),
      catchError(err => of(false))
    )

  }

  createUser(formData: RegisterForm) {

    return this.http.post(`${base_url}/users`, formData);

  }

  updateUser(formData: UpdateForm) {




    return this.http.put(`${base_url}/users/${ this.user.uid }`, formData, {
      headers: {
      'jwt': this.token
    }
  }).subscribe(resp => {

    this.user = resp['user'];

    this.router.navigateByUrl('/dashboard/profile')

  });

  }

  loginUser(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('adminProJWT', resp['jwt']);
      })
    )

  }

  loginGoogle(jwt: string) {

    return this.http.post(environment.urlBackEnd, { jwt }).pipe(
      tap((resp: any) => {
        localStorage.setItem('adminProJWT', resp['jwt']);
        localStorage.removeItem('email');
        localStorage.setItem('email', resp['user'].email);
        // console.log({userService:resp});

      })
    )

  }
}
