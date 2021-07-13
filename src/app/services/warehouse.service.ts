import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AddWarehouseDTO } from '../models/Warehouse/AddWarehouseDTO.model';
import { configDTO } from '../models/DTOs/warehouse/configDTO.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  readonly rootURL = "https://localhost:44320/warehouse/";
  private token: string;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("jwt");
  }

  getWarehouses() {
    return this.http.get(this.rootURL, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  addStorageBins(config: configDTO) {
    return this.http.post(this.rootURL + "addConfig/", config, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    })
  }

  addWarehouse(newWarehouse: AddWarehouseDTO) {
    return this.http.post(this.rootURL, newWarehouse, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

}
