import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { UserDTO } from 'src/app/models/DTOs/userDTO.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  faWindowClose = faWindowClose;
  addUserForm: FormGroup;
  selectedFile: File;
  roles: string[] = ["Admin", "Operater", "Moderator"];

  constructor(public userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      passwordConfirmation: new FormControl(null, Validators.required),
    });
  }

  addUser() {
    var newUser: UserDTO = {
      firstname: this.addUserForm.value.firstname,
      lastname: this.addUserForm.value.lastname,
      role: this.addUserForm.value.role,
      phoneNumber: this.addUserForm.value.phoneNumber,
      email: this.addUserForm.value.email,
      password: this.addUserForm.value.password,
    }
    this.userService.addUser(newUser).subscribe(result => {
      this.dialogRef.close();
    }, err => {
      console.log(err);
    });
  }

  // uploadUserPicture(userPicture: File) {
  //   if (userPicture != null) {
  //     this.selectedFile = userPicture[0];
  //   }
  // }

  // removeUserPicture(userPicture: File) {
  //   if (this.selectedFile.name == userPicture.name) {
  //   }
  // }
}
