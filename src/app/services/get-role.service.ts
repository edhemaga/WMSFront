import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GetRoleService {

  readonly rootURL = "https://localhost:44320/user/";
  private token: string;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("jwt");
  }

  isAdmin() {
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    let httpParam = new HttpParams().set("Email", decodedToken.aud);
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
    const options = { params: httpParam, headers: headers };
    return this.http.get(this.rootURL + "isAdmin", options);
  }

}
