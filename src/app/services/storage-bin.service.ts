import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StorageBinService {

  readonly rootURL = "https://localhost:44320/storagebin/";
  private token: string;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("jwt");
  }

  getStorageBins() {
    return this.http.get(this.rootURL + "getConfig", {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

}
