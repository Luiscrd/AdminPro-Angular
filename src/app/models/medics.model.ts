import { Hospital } from './hospital.model';
import { environment } from "src/environments/environment";

const base_url = environment.base_url;

interface _hospitalUser {
  _id: string,
  name: string,
  img: string,
}

interface _medicUser {
  _id: string,
  name: string,
  img: string,
}

interface _medicHospital {
  name: string,
  _id?: string,
  img?: string,
  user?: _hospitalUser,
}

export class Medics {

  constructor(

    public name: string,
    public _id?: string,
    public img?: string,
    public user?: _medicUser,
    public hospital?: Hospital

  ) { }

  get ImageUrl() {

    if (!this.img) {

      return `${base_url}/upload/medics/no-image`;

    }

    if (this.img) {

      if (this.img.includes('https')) return this.img;

      return `${base_url}/upload/medics/${this.img}`;

    } else {

      return `${base_url}/upload/medics/no-image`;

    }
  }

}
