import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { addSeriesDTO } from 'src/app/models/DTOs/item/addSeriesDTO.model';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { OrderService } from 'src/app/services/order.service';
import { SeriesService } from 'src/app/services/series.service';
import { inflowDTO } from 'src/app/models/DTOs/order/inflowDTO.model';
import { orderDTO } from 'src/app/models/DTOs/order/orderDTO.model';
import { faPlus, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent implements OnInit {

  addSeriesFrom: FormGroup;
  addOrderFrom: FormGroup;
  faPlus = faPlus;
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;
  items: Item[];
  series: addSeriesDTO[] = [];
  orders: inflowDTO;
  isAddingSeries: boolean = false;
  constructor(public ItemService: ItemService, public orderService: OrderService, public seriesService: SeriesService, public dialogRef: MatDialogRef<IncomingComponent>) { }

  ngOnInit(): void {
    this.ItemService.getItems().subscribe(data => {
      this.items = data as Item[];
    })
    this.addOrderFrom = new FormGroup({
      client: new FormControl(null, Validators.required),
    });
    this.addSeriesFrom = new FormGroup({
      dateOfProduction: new FormControl(null, Validators.required),
      dateOfExpiration: new FormControl(null, Validators.required),
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

  submitOrder() {
    var newOrder: inflowDTO = {
      client: this.addOrderFrom.value.client,
      type: "ulaz",
      series: this.series
    }
    this.orderService.inflowOrder(newOrder).subscribe(() => { this.dialogRef.close(); },
      err => {
        console.log(err);
      });
  }

  submitSeries() {
    if (new Date(this.addSeriesFrom.value.dateOfExpiration) > new Date) {
      var newSeries: any = {
        quantity: this.addSeriesFrom.value.quantity,
        itemLabel: this.addSeriesFrom.value.item.label,
        itemId: this.addSeriesFrom.value.item.id,
        dateOfProduction: this.addSeriesFrom.value.dateOfProduction,
        dateOfExpiration: this.addSeriesFrom.value.dateOfExpiration,
      }
      this.series.push(newSeries);
    }
  }

}
