import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;
export class User {

  constructor(

    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public age?: Number,
    public phone?: string,
    public country?: string,
    public desc?: string,
    public uid?: string,

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
