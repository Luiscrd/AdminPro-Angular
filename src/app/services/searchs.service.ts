import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Medics } from '../models/medics.model';

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

  private transUsers(res: any[]): any[] {

    return res.map(user => new User(
      user.name,
      user.email,
      '',
      user.img,
      user.google,
      user.role,
      user.age,
      user.phone,
      user.country,
      user.desc,
      user.uid
    ));

  }

  private transHospitals(res: any[]): any[] {

    return res.map(hospital => new Hospital(hospital.name, hospital.uid, hospital.img, hospital.user));

  }

  private transMedics(res: any[]): any[] {

    return res.map(medic => new Medics(medic.name, medic.uid, medic.img, medic.user, medic.hospital));

  }

  searchByTerm(term: string) {

    const url = `${base_url}/all/${term}`;

    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => {
          if (resp['ok']) {
            return {
              ok: resp['ok'],
              users: this.transUsers(resp['users']),
              medics: this.transMedics(resp['medics']),
              hospitals: this.transHospitals(resp['hospitals']),
            }
          } else {
            return {
              ok: resp['ok']
            }
          }

        })
      )
  }

  search(
    tipe: 'users' | 'hospitals' | 'medics',
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

            case 'hospitals':
              return this.transHospitals(resp[tipe]);

            case 'medics':
              return this.transMedics(resp[tipe]);

            default:
              return [];
          }
          resp[tipe]
        })
      )
  }


}
