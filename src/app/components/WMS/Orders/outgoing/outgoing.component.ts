import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { addSeriesDTO } from 'src/app/models/DTOs/item/addSeriesDTO.model';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { OrderService } from 'src/app/services/order.service';
import { SeriesService } from 'src/app/services/series.service';
import { outflowDTO } from 'src/app/models/DTOs/order/outflowDTO.model';
import { orderDTO } from 'src/app/models/DTOs/order/orderDTO.model';
import { faPlus, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-outgoing',
  templateUrl: './outgoing.component.html',
  styleUrls: ['./outgoing.component.css']
})
export class OutgoingComponent implements OnInit {


  addSeriesFrom: FormGroup;
  addOrderFrom: FormGroup;
  faPlus = faPlus;
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;
  items: Item[];
  series: addSeriesDTO[] = [];
  orders: outflowDTO;
  isAddingSeries: boolean = false;
  constructor(public ItemService: ItemService, public orderService: OrderService, public seriesService: SeriesService, public dialogRef: MatDialogRef<OutgoingComponent>) { }

  ngOnInit(): void {
    this.ItemService.getItems().subscribe(data => {
      this.items = data as Item[];
    })
    this.addOrderFrom = new FormGroup({
      client: new FormControl(null, Validators.required),
    });
    this.addSeriesFrom = new FormGroup({
      quantity: new FormControl(null, Validators.required),
      item: new FormControl(null, Validators.required),
    });
  }
  toggleOrder() {
    if (this.isAddingSeries) {
      this.isAddingSeries = false;
    } else {
      this.isAddingSeries = true;
    }
  }

  removeFromOrder(seriesToDelete) {
    for (var i = 0; i < this.series.length; i++) {
      if (this.series[i] === seriesToDelete) {
        this.series.splice(i, 1);
      }
    }
  }

  async submitOrder() {
    var newOrder: outflowDTO = {
      client: this.addOrderFrom.value.client,
      type: "izlaz",
      items: this.series
    }
    await this.orderService.outflowOrder(newOrder).subscribe(() => { this.dialogRef.close(); },
      err => {
        console.log(err);
      });
  }

  async submitSeries() {
    var newSeries: any = {
      quantity: this.addSeriesFrom.value.quantity,
      itemLabel: this.addSeriesFrom.value.item.label,
      itemId: this.addSeriesFrom.value.item.id,
    };
    await this.series.push(newSeries);
  }
}

