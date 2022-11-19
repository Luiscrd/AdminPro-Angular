import { SidebarService } from './../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFuctions():any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {



  constructor(

    private settingsService: SettingsService,

    private sidebarService: SidebarService

  ) {}

  ngOnInit(): void {

    customInitFuctions()

    this.sidebarService.loadMenu();

  }

  year = new Date().getFullYear();

}
