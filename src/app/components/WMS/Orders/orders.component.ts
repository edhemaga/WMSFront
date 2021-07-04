import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { orderDTO } from '../../../models/DTOs/order/orderDTO.model';
import { MatDialog } from '@angular/material/dialog';
import { IncomingComponent } from './incoming/incoming.component';
import { OutgoingComponent } from './outgoing/outgoing.component';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  pageNumber: number;
  pageSize: number;
  pageCount: number;
  pageOffset: number;

  constructor(public orderService: OrderService, public dialog: MatDialog) {
    this.pageNumber = 0;
    this.pageSize = 10;
  }

  orders: orderDTO[];

  ngOnInit(): void {
    this.orderService.getOrderCount().subscribe(data => {
      this.pageCount = data as number;
    })
    this.getPagedResponse();
  }
  setPage(pageInfo) {
    this.pageNumber = pageInfo.page;
    this.getPagedResponse();
  }

  inflowOrder() {
    const dialogRef = this.dialog.open(IncomingComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getPagedResponse();
    });
  }
  outflowOrder() {
    const dialogRef = this.dialog.open(OutgoingComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getPagedResponse();
    });
  }

  getPageSize(pageSize) {
    this.pageNumber = 1;
    this.pageSize = pageSize;
    this.getPagedResponse();
  }

  private getPagedResponse() {
    this.orderService.getPagedResponse(this.pageNumber, this.pageSize).subscribe(data => {
      this.orders = data as orderDTO[];
    });
  }
}
