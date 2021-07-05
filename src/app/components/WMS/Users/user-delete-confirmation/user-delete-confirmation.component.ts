import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-delete-confirmation',
  templateUrl: './user-delete-confirmation.component.html',
  styleUrls: ['./user-delete-confirmation.component.css']
})
export class UserDeleteConfirmationComponent implements OnInit {

  token: string;

  constructor(public userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, public dialogRef: MatDialogRef<UserDeleteConfirmationComponent>) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("jwt");
  }

  deleteRow(id: string) {
    this.userService.deleteUser(id, this.token).subscribe(() => {
      this.dialogRef.close(); this.toastr.success('Uspješno ste izvršili željenu radnju!');
    },
      () => {
        this.toastr.error('Desio se problem. Pokušajte ponovo!');
      });
  }

  closeConfirmation() {
    this.dialogRef.close();
  }
}
