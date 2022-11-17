import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  constructor(

    private http: HttpClient,

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

  private transUsers(res: any[]): User[] {

    return res.map(user => new User(user.name, user.email, '', user.img, user.google, user.role, 0, '', '', '', user.uid));

  }

  search(
    tipe: 'users' | 'hopitals' | 'medics',
    term: string,
    to: number = 0
  ) {
    const url = `${base_url}/all/${tipe}/${term}?to=${to}`;

    return this.http.get(url, this.headers)
    .pipe(
      map((resp: any) => {

        switch (tipe) {
          case 'users':
            return this.transUsers(resp[tipe]);

          default:
            return [];
        }
        resp[tipe]
      })
    )
  }


}
