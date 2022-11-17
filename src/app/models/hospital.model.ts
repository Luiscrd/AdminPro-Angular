import { environment } from "src/environments/environment";

const base_url = environment.base_url;

interface _hospitalUser {
  _id: string,
  name: string,
  img: string,
}

export class Hospital {

  constructor(

    public name: string,
    public _id?: string,
    public img?: string,
    public user?: _hospitalUser,

  ) { }

  get ImageUrl() {

    if (!this.img) {

      return `${base_url}/upload/users/no-image`;

    }

    if (this.img) {

      if (this.img.includes('https')) return this.img;

      return `${base_url}/upload/users/${this.img}`;

    } else {

      return `${base_url}/upload/users/no-image`;

    }
  }

}
