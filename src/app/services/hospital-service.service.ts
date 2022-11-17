import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalServiceService {

  constructor(

    private http: HttpClient,

    private router: Router,

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

  loadingHospitals(to: number = 0) {

    const url = `${base_url}/hospitals?to=${to}`;

    return this.http.get(url, this.headers).pipe(
      map(resp => {
        return {
          hospitals: resp['hospitals'],
          total: resp['total']
        }
      })
    )

  }
}
