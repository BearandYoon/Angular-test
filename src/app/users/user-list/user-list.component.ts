import { Component, OnInit } from '@angular/core';

import { UserService } from './../services/user.service';
import { User } from './../interfaces/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserList().subscribe((response: User[]) => {
      this.users = response;
    });
  }
}
