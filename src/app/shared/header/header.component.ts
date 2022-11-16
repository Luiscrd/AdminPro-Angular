import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public imgUrl = '';

  public name = '';

  public email = '';

  public user: User;

  constructor(

    private userService: UsersService,

  ) {

    this.imgUrl = userService.user.ImageUrl;

    this.name = userService.user.name;

    this.email = userService.user.email;

    this.user = userService.user;

  }

  ngOnInit(): void {
  }

  logout() {

    this.userService.logout();

  }

}
