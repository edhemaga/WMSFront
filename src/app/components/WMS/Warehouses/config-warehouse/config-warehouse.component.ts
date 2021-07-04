import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DrawingGridService, Pixel, PaintingMode } from 'ngx-drawing-grid';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { configDTO } from '../../../../models/DTOs/warehouse/configDTO.model';
import { gridFieldDTO } from 'src/app/models/DTOs/warehouse/gridFieldDTO.model';
import { storageBinDTO } from 'src/app/models/DTOs/warehouse/storageBinDTO.model';

import { WarehouseService } from 'src/app/services/warehouse.service';
import { StorageBinService } from 'src/app/services/storage-bin.service';

@Component({
  selector: 'app-config-warehouse',
  templateUrl: './config-warehouse.component.html',
  styleUrls: ['./config-warehouse.component.css']
})
export class ConfigWarehouseComponent implements OnInit {

  private readonly destroy$: Subject<void> = new Subject<void>();

  width: number;
  height: number;
  pixelSize: number;
  pixelToAdd: Pixel[] = [];
  storageBins: storageBinDTO[] = [];
  warehouse_id: string;
  private paintingMode: PaintingMode;
  configForm: FormGroup;

  constructor(
    public warehouseService: WarehouseService,
    public storageBinService: StorageBinService,
    private route: ActivatedRoute,
    private host: ElementRef,
    private gridService: DrawingGridService,
  ) {
    this.warehouse_id = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.storageBinService.getStorageBins().subscribe(data => {
      this.storageBins = data as storageBinDTO[];
    })
    this.gridService.paintingMode$.pipe(takeUntil(this.destroy$)).subscribe((paintingMode) => {
      this.paintingMode = paintingMode;
    });
    this.configForm = new FormGroup({
      section: new FormControl(null, Validators.required),
      width: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
    });
  }

  async submitConfig() {

    if (this.configForm.value.width != undefined && this.configForm.value.height) {
      this.pixelSize = 30;
      this.width = Number(this.configForm.value.width * 31);
      this.height = Number(this.configForm.value.height * 31);
    }
  }

  getConfig() {
    for (var cnt = 0; cnt < this.storageBins.length; cnt++) {
      this.paintingMode == PaintingMode.CREATE;
      this.fillPixel(Number(this.storageBins[cnt].column), Number(this.storageBins[cnt].rack));
    }
    var x = Math.max(...this.storageBins.map(o => Number(o.column)), 0);
    console.log(x);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMouseDown(pixel: Pixel) {
    if (pixel.fillStyle == "black") {
      for (var cnt = 0; cnt < this.pixelToAdd.length; cnt++) {
        if (this.pixelToAdd[cnt].id == pixel.id) {
          this.pixelToAdd.splice(cnt, 1);
        }
      }
    }
  }

  onMouseMove(pixel: Pixel) {
    if (pixel.fillStyle == undefined && this.paintingMode == PaintingMode.CREATE) {
      this.pixelToAdd.push(pixel);
      this.fillPixel(pixel.x, pixel.y);
    }
  }

  onMouseUp(pixel: Pixel) { }

  onContextMenu(pixel: Pixel) {
    this.gridService.clearPixel(pixel.x, pixel.y);
  }

  private fillPixel(x: number, y: number) {
    if (this.paintingMode === PaintingMode.ERASE) {
      this.gridService.clearPixel(x, y);
      return;
    }
    this.gridService.fillPixel(x, y, 'black');
  }

  saveConfig() {
    var fieldsTemp: gridFieldDTO[] = [];
    for (var cnt = 0; cnt < this.pixelToAdd.length; cnt++) {
      var fieldTemp: gridFieldDTO = {
        id: this.pixelToAdd[cnt].id,
        x: String(this.pixelToAdd[cnt].x),
        y: String(this.pixelToAdd[cnt].y)
      }
      fieldsTemp.push(fieldTemp);
    }

    var config: configDTO = {
      id: this.warehouse_id,
      section: this.configForm.value.section,
      fields: fieldsTemp
    }
    this.warehouseService.addStorageBins(config).subscribe();
  }
}
