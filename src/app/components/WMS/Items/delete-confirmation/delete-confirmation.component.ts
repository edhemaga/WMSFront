import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(public ItemService: ItemService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeleteConfirmationComponent>) { }

  ngOnInit(): void {
  }

  deleteRow(id: string) {
    this.ItemService.deleteItem(id).subscribe(result => {
      this.closeConfirmation();
    },
      err => {
        console.log(err);
      });
  }

  closeConfirmation() {
    this.dialogRef.close();
  }

}
