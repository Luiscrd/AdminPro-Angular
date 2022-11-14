import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-rigtsidebar',
  templateUrl: './rigtsidebar.component.html',
  styleUrls: ['./rigtsidebar.component.css']
})
export class RigtsidebarComponent implements OnInit {

  constructor(

    private userService: UsersService,

  ) { }

  ngOnInit(): void {
  }

  logout() {

    this.userService.logout();

  }

}
