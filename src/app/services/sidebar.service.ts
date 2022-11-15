import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: Menu[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Mi perfil', url: '/dashboard/profile'},
        { title: 'Main', url: '/dashboard/main'},
        { title: 'Progfressbar', url: '/dashboard/progress'},
        { title: 'Grafics', url: '/dashboard/grafica1'},
        { title: 'Promesas', url: '/dashboard/promesas'},
        { title: 'Rxjs', url: '/dashboard/rxjs'},
      ]
    }
  ]



  constructor() { }
}
