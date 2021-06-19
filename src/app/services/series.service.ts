import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { assignItemLocationDTO } from '../models/DTOs/item/assignItemLocationDTO.model';
import { addSeriesDTO } from '../models/DTOs/item/addSeriesDTO.model';

@Injectable({
  providedIn: 'root'
})

export class SeriesService {

  readonly rootURL = "https://localhost:44320/series/";
  private token: string;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("jwt");
  }
  addNewSeries(newSeries: addSeriesDTO) {
    return this.http.post(this.rootURL, newSeries, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }
  assignStorageBin(itemDetails: assignItemLocationDTO) {
    return this.http.put(this.rootURL + "assignStorageBin/", itemDetails);
  }

  deleteSeries(id: string) {
    return this.http.delete(this.rootURL + id);
  }

}
