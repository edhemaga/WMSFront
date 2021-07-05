import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { addItemDTO } from 'src/app/models/DTOs/item/addItemDTO.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  addItemForm: FormGroup;
  constructor(public ItemService: ItemService, private toastr: ToastrService, public dialogRef: MatDialogRef<AddItemComponent>) { }

  ngOnInit(): void {

    this.addItemForm = new FormGroup({
      barcode: new FormControl(null, Validators.required),
      label: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      fragilityIndex: new FormControl(null, Validators.required),
      minimalQuantity: new FormControl(null, Validators.required),
    });
  }

  addItem() {
    var newItem: addItemDTO = {
      barcode: this.addItemForm.value.barcode,
      label: this.addItemForm.value.label.trim(),
      category: this.addItemForm.value.category.trim(),
      minimalquantity: this.addItemForm.value.minimalQuantity,
      fragilityindex: this.addItemForm.value.fragilityIndex
    }
    this.ItemService.addItem(newItem).subscribe(() => {
      this.toastr.success('Uspješno ste izvršili željenu radnju!');
    }, () => {
      this.toastr.error('Desio se problem. Pokušajte ponovo!');
    });
  }

}
