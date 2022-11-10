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
        { title: 'Main', url: '/dashboard'},
        { title: 'Progfressbar', url: '/dashboard/progress'},
        { title: 'Grafics', url: '/dashboard/grafica1'},
      ]
    }
  ]



  constructor() { }
}
