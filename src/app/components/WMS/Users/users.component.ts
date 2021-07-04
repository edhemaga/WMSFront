import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from 'src/app/services/user.service';
import { GetRoleService } from 'src/app/services/get-role.service';

import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AddUserComponent } from './add-user/add-user.component';
import { UserDeleteConfirmationComponent } from './user-delete-confirmation/user-delete-confirmation.component';
import { UserDTO } from 'src/app/models/DTOs/userDTO.model';
import { UserEditComponent } from './user-edit/user-edit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;

  constructor(public userService: UserService, public GetRoleService: GetRoleService, public dialog: MatDialog) { }
  token: string;
  users: UserDTO[];
  userAdmin: UserDTO[];
  userOperator: UserDTO[];
  userModerator: UserDTO[];
  isAdmin: boolean = false;

  ngOnInit(): void {

    this.getAdminUsers();
    this.getOperatorUsers();
    this.getModeratorUsers();

    this.token = localStorage.getItem("jwt");
    this.isAdminValidation();
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data as UserDTO[];
    });
  }

  getAdminUsers() {
    this.userService.getAdminUsers().subscribe(data => {
      this.userAdmin = data as UserDTO[];
    });
  }

  getOperatorUsers() {
    this.userService.getOperatorUsers().subscribe(data => {
      this.userOperator = data as UserDTO[];
    });
  }

  getModeratorUsers() {
    this.userService.getModeratorUsers().subscribe(data => {
      this.userModerator = data as UserDTO[];
    });
  }

  addNewUser() {
    const dialogRef = this.dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe(event => {
    });
  }

  deleteUser(user: UserDTO) {
    const dialogRef = this.dialog.open(UserDeleteConfirmationComponent, {
      data:
        { user: user }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  editUser(user: UserDTO) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      data:
        { user: user }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  isAdminValidation() {
    return this.GetRoleService.isAdmin().subscribe(data => {
      this.isAdmin = data as boolean;
    });
  }
}
