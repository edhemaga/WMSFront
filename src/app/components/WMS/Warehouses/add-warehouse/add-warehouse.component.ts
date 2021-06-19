import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddWarehouseDTO } from 'src/app/models/Warehouse/AddWarehouseDTO.model';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css']
})
export class AddWarehouseComponent implements OnInit {

  addWarehouseForm: FormGroup;

  constructor(public warehouseService: WarehouseService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddWarehouseComponent>) { }

  ngOnInit(): void {
    this.addWarehouseForm = new FormGroup({
      address: new FormControl(null, Validators.required),
      contactEmail: new FormControl(null, Validators.required),
      contactPhoneNumber: new FormControl(null, Validators.required),
    });
  }

  addWarehouse() {
    var newWarehouse: AddWarehouseDTO = {
      address: this.addWarehouseForm.value.address,
      contactEmail: this.addWarehouseForm.value.contactEmail,
      contactPhoneNumber: this.addWarehouseForm.value.contactPhoneNumber,
    }
    this.warehouseService.addWarehouse(newWarehouse).subscribe();
  }
}
