import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  private url: string = localStorage.getItem('them') || './assets/css/colors/default-dark.css';

  constructor() {

    this.linkTheme?.setAttribute('href', this.url);

  }

  changeTeam( theme: string ) {

    const url = `./assets/css/colors/${ theme }.css`;

    this.linkTheme?.setAttribute('href', url);

    localStorage.setItem('them', url);

    this.checkCurrentTheme();

  }

  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector');

    links.forEach( link => {

      link.classList.remove('working');

      const btnTheme = link.getAttribute('data-theme');

      const btnThemeUrls = `./assets/css/colors/${ btnTheme }.css`;

      const currentTheme = this.linkTheme?.getAttribute('href');

      if (currentTheme === btnThemeUrls) link.classList.add('working');

    })

  }

}
