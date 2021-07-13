import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { storageBinDTO } from 'src/app/models/DTOs/warehouse/storageBinDTO.model';
import { StorageBin } from 'src/app/models/Warehouse/StorageBin/StorageBin.model';
import { StorageBinService } from 'src/app/services/storage-bin.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.css']
})
export class WarehouseDetailsComponent implements OnInit {
  warehouse_id: string;
  storageBins: storageBinDTO[] = [];
  constructor(
    private route: ActivatedRoute,
    public warehouseService: WarehouseService,
    public storageBinService: StorageBinService,
  ) {
    this.warehouse_id = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.storageBinService.getStorageBins().subscribe(data => {
      this.storageBins = data as storageBinDTO[];
    })
  }

  test() {
    console.log(this.storageBins[0]);
  }

}
