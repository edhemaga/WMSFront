import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemDTO } from 'src/app/models/DTOs/item/itemDTO.model';
import { addSeriesDTO } from 'src/app/models/DTOs/item/addSeriesDTO.model';
import { assignItemLocationDTO } from 'src/app/models/DTOs/item/assignItemLocationDTO.model';
import { ItemService } from 'src/app/services/item.service';
import { SeriesService } from 'src/app/services/series.service';
import { faPallet, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  constructor(public itemService: ItemService, private toastr: ToastrService, public seriesService: SeriesService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ItemDetailsComponent>) { }

  item: ItemDTO;
  rows = [];
  loadingIndicator = true;
  reorderable = true;

  faPallet = faPallet;
  faPlusCircle = faPlusCircle;
  faTrash = faTrash;
  addNewsSeriesToggle = true;
  addSeriesFrom: FormGroup;

  ngOnInit(): void {
    this.itemService.getItem(this.data.item.id).subscribe(data => {
      this.item = data as ItemDTO;
    });
    this.addSeriesFrom = new FormGroup({
      dateOfProduction: new FormControl(null, Validators.required),
      dateOfExpiration: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
    });
  }

  assigntStorageBin(item, series) {
    var itemDetails: assignItemLocationDTO = {
      seriesId: series,
      itemId: item
    }
    this.seriesService.assignStorageBin(itemDetails).subscribe(() => {
      this.itemService.getItem(this.data.item.id).subscribe(data => {
        this.item = data as ItemDTO;
      });
      this.toastr.success('Uspješno ste izvršili željenu radnju!');
    }, () => {
      this.toastr.error('Desio se problem. Pokušajte ponovo!');
    });
  }

  deleteSeries(seriesId: string) {
    this.seriesService.deleteSeries(seriesId).subscribe(() => {
      this.toastr.success('Uspješno ste izvršili željenu radnju!');
    }, () => {
      this.toastr.error('Desio se problem. Pokušajte ponovo!');
    });
  }

  addNewSeries() {
    this.addNewsSeriesToggle = false;
  }

  submitSeries() {
    if (new Date(this.addSeriesFrom.value.dateOfExpiration) > new Date) {
      var newSeries: addSeriesDTO = {
        quantity: this.addSeriesFrom.value.quantity,
        dateOfExpiration: this.addSeriesFrom.value.dateOfExpiration,
        dateOfProduction: this.addSeriesFrom.value.dateOfProduction,
        itemId: this.item.id
      }
      this.seriesService.addNewSeries(newSeries).subscribe(() => {
        this.addNewsSeriesToggle = true;
        this.toastr.success('Uspješno ste izvršili željenu radnju!');
      }, () => {
        this.toastr.error('Desio se problem. Pokušajte ponovo!');
      });
    }
  }

}

