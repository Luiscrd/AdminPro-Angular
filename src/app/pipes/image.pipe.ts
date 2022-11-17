import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipe: 'users' | 'medics' | 'hospitals'): string {

    if (!img) {

      return `${base_url}/upload/users/no-image`;

    }

    if (img) {

      if (img.includes('https')) return img;

      return `${base_url}/upload/users/${img}`;

    } else {

      return `${base_url}/upload/users/no-image`;

    }
  }


}
