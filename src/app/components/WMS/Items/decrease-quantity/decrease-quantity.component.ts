import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-decrease-quantity',
  templateUrl: './decrease-quantity.component.html',
  styleUrls: ['./decrease-quantity.component.css']
})
export class DecreaseQuantityComponent implements OnInit {

  decreaseQuantityForm: FormGroup;
  constructor(public ItemService: ItemService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DecreaseQuantityComponent>) { }

  ngOnInit(): void {
    this.decreaseQuantityForm = new FormGroup({
      decreaseQuantityInput: new FormControl(null, Validators.required),
    });
  }

  decreaseQuantity() {
    this.ItemService.decreaseQuantity(this.data.item.id, this.decreaseQuantityForm.value.decreaseQuantityInput).subscribe(result => {
      this.dialogRef.close();
    }, err => {
      console.log(err);
    })
  }
}
