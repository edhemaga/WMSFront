import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ItemDTO } from 'src/app/models/DTOs/item/itemDTO.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  editItemForm: FormGroup;

  constructor(public ItemService: ItemService, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, public dialogRef: MatDialogRef<ItemEditComponent>) { }

  ngOnInit(): void {

    this.editItemForm = new FormGroup({
      barcode: new FormControl(this.data.item.barcode),
      label: new FormControl(this.data.item.label),
      category: new FormControl(this.data.item.category),
      minimalQuantity: new FormControl(this.data.item.minimalQuantity)
    });
  }

  editItem(id: string) {

    var item: ItemDTO = {
      id: id.trim(),
      barcode: this.editItemForm.value.barcode,
      category: this.editItemForm.value.category.trim(),
      label: this.editItemForm.value.label.trim(),
      minimalQuantity: this.editItemForm.value.minimalQuantity
    }
    this.ItemService.editItem(item)
      .subscribe(() => {
        this.toastr.success('Uspješno ste izvršili željenu radnju!');
      }, () => {
        this.toastr.error('Desio se problem. Pokušajte ponovo!');
      });
  }
}
