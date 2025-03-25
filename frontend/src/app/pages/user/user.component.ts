import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  imports: [RouterLink, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  showUserForm = false

  users: any = []

  userType = localStorage.getItem('type')

  constructor(private _userService: UserService) {
    this.getUsers()
  }
  getUsers() {
    this._userService.findAll().subscribe(data => { this.users = data })
  }

  logOut() {
    localStorage.clear()
  }
}


