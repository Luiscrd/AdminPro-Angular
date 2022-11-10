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

    private settingsService: SettingsService

  ) {}

  ngOnInit(): void {

    customInitFuctions()

  }

  year = new Date().getFullYear();

}
