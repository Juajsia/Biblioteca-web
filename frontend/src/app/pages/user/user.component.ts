import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  showUserForm = false

  users: any = []

  constructor(private _userService: UserService) {
    this.getUsers()
  }
  getUsers() {
    this._userService.findAll().subscribe(data => { this.users = data })
  }
}


