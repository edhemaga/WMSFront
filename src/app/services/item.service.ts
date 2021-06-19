import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { addItemDTO } from '../models/DTOs/item/addItemDTO.model';
import { ItemDTO } from '../models/DTOs/item/itemDTO.model';
import { assignItemLocationDTO } from '../models/DTOs/item/assignItemLocationDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly rootURL = "https://localhost:44320/item/";
  private token: string;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("jwt");
  }

  getItems() {
    return this.http.get(this.rootURL, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  getItem(id: string) {
    return this.http.get(this.rootURL + id, {
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

  getSearchResult(searchWord: string) {
    let httpParam = new HttpParams().set("searchWord", searchWord);
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
    const options = { params: httpParam, headers: headers };
    return this.http.get(this.rootURL + "searchItem",
      options);
  }

  getItemCount() {
    return this.http.get(this.rootURL + "getItemCount", {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  getCSV() {
    return this.http.get(this.rootURL + "exportItemCSV", {
      responseType: 'blob', reportProgress: true, headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  deleteItem(id: string) {
    return this.http.delete(this.rootURL + id, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  editItem(item: ItemDTO) {
    return this.http.put(this.rootURL, item, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  addItem(newItem: addItemDTO) {
    return this.http.post(this.rootURL, newItem, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    });
  }

  increaseQuantity(id: string, quantity: number) {
    return this.http.put(this.rootURL + "increaseQuantity/" + id, quantity, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    })
  }

  decreaseQuantity(id: string, quantity: number) {
    return this.http.put(this.rootURL + "decreaseQuantity/" + id, quantity, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"))
    })
  }

}
