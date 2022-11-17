import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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

  search(
    tipe: 'users' | 'hopitals' | 'medics',
    term: string,
    to: number = 0
  ) {
    const url = `${base_url}/all/${tipe}/${term}?to=${to}`;

    return this.http.get(url, this.headers)
    // .pipe(
    //   map(resp => {resp[tipe]})
    // )
  }


}
