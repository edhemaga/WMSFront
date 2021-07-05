import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDTO } from 'src/app/models/DTOs/userDTO.model';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  editUserForm: FormGroup;
  selectedFile: File;
  roles: string[] = ["Admin", "Operater", "Moderator"];

  constructor(public userService: UserService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UserEditComponent>) { }

  ngOnInit(): void {
    this.editUserForm = new FormGroup({
      firstname: new FormControl(this.data.user.firstname, Validators.required),
      lastname: new FormControl(this.data.user.lastname, Validators.required),
      role: new FormControl(this.data.user.role, Validators.required),
      phoneNumber: new FormControl(this.data.user.phoneNumber, Validators.required),
      email: new FormControl(this.data.user.email, Validators.required),
    });
  }

  editUser() {
    var userToEdit: UserDTO = {
      firstname: this.editUserForm.value.firstname,
      lastname: this.editUserForm.value.lastname,
      role: this.editUserForm.value.role,
      phoneNumber: this.editUserForm.value.phoneNumber,
      email: this.editUserForm.value.email,
    }
    userToEdit.id = this.data.user.id;
    this.userService.editUser(userToEdit).subscribe(() => {
      this.dialogRef.close(); this.toastr.success('Uspješno ste izvršili željenu radnju!');
    }, () => {
      this.toastr.error('Desio se problem. Pokušajte ponovo!');
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
