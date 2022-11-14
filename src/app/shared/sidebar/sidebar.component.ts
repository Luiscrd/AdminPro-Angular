import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { Menu } from '../../interfaces/menu.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItemes: Menu[];

  public imgUrl = '';

  public name = '';

  constructor(

    private sidebarService: SidebarService,

    private userService: UsersService,

  ) {

    this.menuItemes = sidebarService.menu;

    this.imgUrl = userService.user.ImageUrl;

    this.name = userService.user.name;

  }

  ngOnInit(): void {
  }

  logout() {

    this.userService.logout();

  }

}
