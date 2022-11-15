import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {


  public user: User;

  public userImg = '';

  constructor(

    private userService: UsersService,

  ) {

    this.user = userService.user;

    this.userImg = userService.user.ImageUrl;

  }

  ngOnInit(): void {

    if (this.user.img.includes('https')) {

      this.userImg = this.user.img;

    } else {

      this.userImg = `${environment.base_url}/upload/users/${this.user.img}`;

    }

  }

}
