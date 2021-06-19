import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { AddWarehouseComponent } from './add-warehouse/add-warehouse.component';
import { Warehouse } from '../../../models/Warehouse/Warehouse.model';

import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  constructor(public warehouseService: WarehouseService, public dialog: MatDialog) { }

  faTrash = faTrash;
  faEdit = faEdit;
  warehouses: Warehouse[];

  ngOnInit(): void {
    this.warehouseService.getWarehouses().subscribe(data => {
      this.warehouses = data as Warehouse[];
      console.log(this.warehouses);
    })
  }

  addNewWarehouse() {
    const dialogRef = this.dialog.open(AddWarehouseComponent);
    dialogRef.afterClosed().subscribe(event => {
    });
  }

  editWarehouse() {
    console.log("edit");
  }

  deleteWarehouse() {
    console.log("delete");
  }

}
