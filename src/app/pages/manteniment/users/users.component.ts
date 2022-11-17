import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';
import { SearchsService } from '../../../services/searchs.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public totalUsers: number = 0;

  public users: User[] = [];

  public usersTemp: User[] = [];

  public to: number = 0;

  public actualPage: number = 1;

  public totalPages: number = 0;

  public loading: boolean = true;

  public searchActive: boolean = false;

  constructor(

    private userService: UsersService,

    private searchService: SearchsService

  ) { }

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers() {

    this.loading = true;

    this.userService.loafingUsers(this.to).subscribe(resp => {

      this.totalUsers = resp['total'];

      this.totalPages = this.totalUsers / 5;

      this.users = resp['users'];

      this.usersTemp = resp['users'];

      this.loading = false;

    })

  }

  changePage(newTo: number) {

    this.to += newTo;

    if (newTo === -5 && this.actualPage > 1) {

      this.actualPage -= 1;

    } else if (newTo === 5 && this.actualPage < this.totalPages) {

      this.actualPage += 1;

    }

    if (this.to < 0) {

      this.to = 0;

    } else if (this.to >= this.totalUsers) {

      this.to -= newTo;

    }

    this.loadUsers();

  }

  search(term: string = '') {

    if ( term.length === 0 ) {

      this.searchActive = false;

      this.users = this.usersTemp;

      return;

    }

    this.to = 0;

    this.searchService.search('users', term, this.to).subscribe(resp => {

      this.users = resp['users'];

      // const total = resp['total'];

      // if( total === 0 ) {
      //   this.actualPage = 1;
      //   this.totalPages = 1;
      // }

      // if ( total > 5 ) {
      //   this.totalPages = total / 5;
      // }

      this.searchActive = true;
    })

  }

}
