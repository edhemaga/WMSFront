import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inflowDTO } from 'src/app/models/DTOs/order/inflowDTO.model';
import { outflowDTO } from 'src/app/models/DTOs/order/outflowDTO.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly rootURL = "https://localhost:44320/order/";
  private token: string;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("jwt");
  }

  getOrders() {
    return this.http.get(this.rootURL, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  getPagedResponse(page: number, pageSize: number) {
    let httpParams = new HttpParams({
      fromObject: {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    })
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
    const options = { params: httpParams, headers: headers };
    return this.http.get(this.rootURL + "getpagedresponse", options);
  }

  getOrderCount() {
    return this.http.get(this.rootURL + "getOrderCount", {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  inflowOrder(inflowDTO: inflowDTO) {
    {
      return this.http.post(this.rootURL + "inflow/", inflowDTO, {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
      })
    }
  }

  outflowOrder(outflowDTO: outflowDTO) {
    {
      return this.http.post(this.rootURL + "outflow/", outflowDTO, {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
      })
    }
  }

}
