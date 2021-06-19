import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserCredentials } from '../models/userCredentials.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly rootURL = "https://localhost:44320/authenticate/";

  constructor(private http: HttpClient) { }

  login(userCredentials: UserCredentials) {
    return this.http.post(this.rootURL, userCredentials);
  }
}
