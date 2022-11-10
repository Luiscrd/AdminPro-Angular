import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { Menu } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItemes: Menu[];

  constructor(

    private sidebarService: SidebarService

  ) {

    this.menuItemes = sidebarService.menu;

  }

  ngOnInit(): void {
  }

}
