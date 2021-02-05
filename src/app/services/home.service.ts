import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FieldDTO } from '../models/fieldDTO.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  readonly rootURL = "https://localhost:44372/map/";

  constructor(private http: HttpClient) { }

  getMaps() {
    return this.http.get(this.rootURL);
  }

  deleteMap(id: string) {
    return this.http.delete(this.rootURL + id);
  }

  addWallFields(id: string, fieldDTOs: any) {
    console.log(fieldDTOs);
    return this.http.put(this.rootURL + "addWall/" + id, fieldDTOs).subscribe();
  }

  removeWallFields(id: string, fieldDTOs: any) {
    console.log(fieldDTOs);
    return this.http.put(this.rootURL + "removeWall/" + id, fieldDTOs).subscribe();
  }

}
