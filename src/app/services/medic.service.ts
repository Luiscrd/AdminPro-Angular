import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medics } from '../models/medics.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class MedicService {

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

  medicByID(id: string ){

    const url = `${base_url}/medics/${id}`;

    return this.http.get(url, this.headers).pipe(
      map(resp => {
        return {
          medic: resp['medic']
        }
      })
    )

  }

  loadingMedics(to: number = 0) {

    const url = `${base_url}/medics?to=${to}`;

    return this.http.get(url, this.headers).pipe(
      map(resp => {
        return {
          medics: resp['medics'],
          total: resp['total']
        }
      })
    )
  }

  createMedics(name: string) {

    const url = `${base_url}/medics`;

    return this.http.post(url, { name }, this.headers);
  }

  updateMedics(medic: Medics) {

    const url = `${base_url}/medics/${medic._id}`;

    return this.http.put(url, { name: medic.name }, this.headers);

  }

  deleteMedics(medics: Medics) {

    const url = `${base_url}/medics/${medics._id}`;

    return this.http.delete(url, this.headers);

  }
}
