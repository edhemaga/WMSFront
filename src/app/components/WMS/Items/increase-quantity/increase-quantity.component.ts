import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-increase-quantity',
  templateUrl: './increase-quantity.component.html',
  styleUrls: ['./increase-quantity.component.css']
})
export class IncreaseQuantityComponent implements OnInit {

  increaseQuantityForm: FormGroup;
  constructor(public ItemService: ItemService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<IncreaseQuantityComponent>) { }

  ngOnInit(): void {
    this.increaseQuantityForm = new FormGroup({
      increaseQuantityInput: new FormControl(null, Validators.required),
    });
  }

  increaseQuantity() {
    this.ItemService.increaseQuantity(this.data.item.id, this.increaseQuantityForm.value.increaseQuantityInput).subscribe(result => {
      this.dialogRef.close();
    }, err => {
      console.log(err);
    })
  }

}
