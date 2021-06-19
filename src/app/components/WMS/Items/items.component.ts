import { Component, OnInit } from '@angular/core';

import { ItemService } from '../../../services/item.service';
import { GetRoleService } from '../../../services/get-role.service';

import { Item } from '../../../models/item.model';
import { faTrash, faEdit, faSearch, faPlus, faMinus, faFileCsv, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { AddItemComponent } from './add-item/add-item.component';
import { IncreaseQuantityComponent } from './increase-quantity/increase-quantity.component';
import { DecreaseQuantityComponent } from './decrease-quantity/decrease-quantity.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;
  faSearch = faSearch;
  faPlus = faPlus;
  faFileCsv = faFileCsv;
  faMinus = faMinus;
  faExchangeAlt = faExchangeAlt;

  pageNumber: number;
  pageSize: number;
  pageCount: number;
  pageOffset: number;

  items: Item[];

  isAdmin: boolean = false;

  constructor(public ItemService: ItemService, public GetRoleService: GetRoleService, public dialog: MatDialog, public datepipe: DatePipe) {
    this.pageNumber = 0;
    this.pageSize = 10;
  }

  ngOnInit(): void {
    this.ItemService.getItemCount().subscribe(data => {
      this.pageCount = data as number;
    });
    this.getPagedResponse();
    this.isAdminValidation();
  }

  openDialog(item) {
    const dialogRef = this.dialog.open(ItemDetailsComponent, {
      panelClass: 'custom-dialog-container',
      height: 'fit-content',
      width: 'fit-content',
      data:
        { item: item }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPagedResponse();
    });
  }

  deleteRow(item: Item) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data:
        { item: item }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPagedResponse();
      this.getRowCount();
    });
  }

  editRow(item: Item) {
    const dialogRef = this.dialog.open(ItemEditComponent, {
      data:
        { item: item }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPagedResponse();
    });

  }

  addItem() {
    const dialogRef = this.dialog.open(AddItemComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getPagedResponse();
      this.getRowCount();
    });
  }

  increaseQuantity(item: Item) {
    const dialogRef = this.dialog.open(IncreaseQuantityComponent, {
      data:
        { item: item }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPagedResponse();
      this.getRowCount();
    });
  }

  decreaseQuantity(item: Item) {
    const dialogRef = this.dialog.open(DecreaseQuantityComponent, {
      data:
        { item: item }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPagedResponse();
      this.getRowCount();
    });
  }

  setPage(pageInfo) {
    this.pageNumber = pageInfo.page;
    this.getPagedResponse();
  }

  getPageSize(pageSize) {
    this.pageNumber = 1;
    this.pageSize = pageSize;
    this.getPagedResponse();
  }

  private getPagedResponse() {
    this.ItemService.getPagedResponse(this.pageNumber, this.pageSize).subscribe(data => {
      this.items = data as Item[];
    });
  }

  getRowCount() {
    this.ItemService.getItemCount().subscribe(data => {
      this.pageCount = data as number;
    });
  }

  search(searchWord) {
    this.ItemService.getSearchResult(searchWord).subscribe(data => {
      this.items = data as Item[];
    });
  }

  exportCSV() {
    this.ItemService.getCSV().subscribe(csvFileBlob => {
      var csvFile = new Blob([csvFileBlob], { type: "application/csv" });
      const data = window.URL.createObjectURL(csvFile);
      var link = document.createElement('a');
      link.href = data;
      var dateNow = Date.now();
      var dateTransformed = this.datepipe.transform(dateNow, "dd_mm_yyyy");
      link.download = "items_" + dateTransformed + ".csv";
      link.click();
    })
  }

  isAdminValidation() {
    return this.GetRoleService.isAdmin().subscribe(data => {
      this.isAdmin = data as boolean;
    });
  }

}
