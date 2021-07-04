import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { AddWarehouseComponent } from './add-warehouse/add-warehouse.component';
import { Warehouse } from '../../../models/Warehouse/Warehouse.model';
import { Router } from '@angular/router';

import { faTrash, faEdit, faPencilRuler } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  constructor(public warehouseService: WarehouseService, public dialog: MatDialog, private router: Router) { }

  faTrash = faTrash;
  faEdit = faEdit;
  faPencilRuler = faPencilRuler;
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

  configureWarehouse(id) {
    this.router.navigate(["home/config/", id]);
  }

  editWarehouse() {
    console.log("edit");
  }

  deleteWarehouse() {
    console.log("delete");
  }

}
