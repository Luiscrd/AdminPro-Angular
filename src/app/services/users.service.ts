import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { Observable, of, tap } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, delay, map } from 'rxjs/operators';
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

  get headers() {
    return {
      headers: {
        'jwt': this.token
      }
    }
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

    return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
      map(resp => {
        localStorage.setItem('adminProJWT', resp['jwt']);
        localStorage.setItem('menu', JSON.stringify(resp['menu']));
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


    return this.http.put(`${base_url}/users/${this.user.uid}`, formData, this.headers).subscribe(resp => {

      this.user = resp['user'];

      this.router.navigateByUrl('/dashboard/profile')

    });

  }

  editUser(formData: UpdateForm, id: string) {


    return this.http.put(`${base_url}/users/${id}`, formData, this.headers);

  }


  loginUser(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('adminProJWT', resp['jwt']);
        localStorage.setItem('menu', JSON.stringify(resp['menu']));
      })
    )

  }

  // loginGoogle(jwt: string) {

  //   return this.http.post(environment.urlBackEnd, { jwt }).pipe(
  //     tap((resp: any) => {
  //       localStorage.setItem('adminProJWT', resp['jwt']);
  //       localStorage.removeItem('email');
  //       localStorage.setItem('email', resp['user'].email);
  //       // console.log({userService:resp});

  //     })
  //   )

  // }

  loafingUsers(to: number = 0) {

    const url = `${base_url}/users?to=${to}`;

    return this.http.get(url, this.headers).pipe(
      map(resp => {
        const users = resp['users']
          .map(user => new User(user.name, user.email, '123456', user.img, user.google, user.role, 0, '', '', '', user.uid))

        return {
          users,
          total: resp['total']
        };
      })
    )

  }

  deleteUser(id: string) {

    const url = `${base_url}/users/${id}`;

    return this.http.delete(url, this.headers);

  }

  updateRole(user: User) {


    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers).subscribe(resp => {



    });

  }

}
