import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  readonly rootURL = "https://localhost:44320/statistics/";
  private token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("jwt");
  }

  getOrderStats() {
    var token = localStorage.getItem("jwt");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.rootURL + "getOrderStats", { headers });
  }

  getGrouppedOrderStats() {
    var token = localStorage.getItem("jwt");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.rootURL + "getGroupedOrderStatistics", { headers });
  }

  getGrouppedItemStats() {
    var token = localStorage.getItem("jwt");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.rootURL + "getGroupedItemStatistics", { headers });
  }
  

  getGrouppedStBinTypeStats() {
    var token = localStorage.getItem("jwt");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.rootURL + "getGroupedStorageBinTypeStatistics", { headers });
  }
}
