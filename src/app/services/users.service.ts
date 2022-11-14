import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(

    private http: HttpClient

  ) { }

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
