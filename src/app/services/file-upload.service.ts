import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async uploadImage(
    file: File,
    tipe: 'users' | 'hopitals' | 'medics',
    id: string
     ) {

    try {

    const url = `${base_url}/upload/${tipe}/${id}`;

    const formData = new FormData();

    formData.append('image', file);

    const resp = await fetch(url, {
      method: 'PUT',
      headers: {
        'jwt': localStorage.getItem('adminProJWT') || ''
      },
      body: formData
    });

    const data = await resp.json();

    console.log(data);

    return 'nombre';


    } catch (error) {

      console.log(error);

      return false;

    }

  }
}
