import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(public ItemService: ItemService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeleteConfirmationComponent>) { }

  ngOnInit(): void {
  }

  deleteRow(id: string) {
    this.ItemService.deleteItem(id).subscribe(() => {
      this.toastr.success('Uspješno ste izvršili željenu radnju!');
    }, () => {
      this.toastr.error('Desio se problem. Pokušajte ponovo!');
    });
  }

  closeConfirmation() {
    this.dialogRef.close();
  }

}
