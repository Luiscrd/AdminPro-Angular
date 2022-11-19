import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: Menu[] = [];

  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  // menu: Menu[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       // { title: 'Mi perfil', url: '/dashboard/profile'},
  //       { title: 'Main', url: '/dashboard/main'},
  //       { title: 'ProgressBar', url: '/dashboard/progress'},
  //       { title: 'Graficas', url: '/dashboard/grafica1'},
  //       // { title: 'Promesas', url: '/dashboard/promesas'},
  //       // { title: 'Rxjs', url: '/dashboard/rxjs'},
  //     ]
  //   },
  //   {
  //     title: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Usuarios', url: '/dashboard/users'},
  //       { title: 'Hospitales', url: '/dashboard/hospitals'},
  //       { title: 'Medicos', url: '/dashboard/medics'},
  //     ]
  //   }
  // ]

}
