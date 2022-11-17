import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

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

  createHospital(name: string) {

    const url = `${base_url}/hospitals`;

    return this.http.post(url, { name }, this.headers);
  }

  updateHospital(hospital: Hospital) {

    const url = `${base_url}/hospitals/${hospital._id}`;

    return this.http.put(url, { name: hospital.name }, this.headers);

  }

  deleteHospital(hospital: Hospital) {

    const url = `${base_url}/hospitals/${hospital._id}`;

    return this.http.delete(url, this.headers);

  }
}
