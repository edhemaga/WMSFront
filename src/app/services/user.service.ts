import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserDTO } from 'src/app/models/DTOs/userDTO.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootURL = "https://localhost:44320/user/";

  constructor(private http: HttpClient) { }

  getUsers() {
    var token = localStorage.getItem("jwt");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.rootURL, { headers });
  }


  getAdminUsers() {
    var token = localStorage.getItem("jwt");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.rootURL + "admins", { headers })
  }

  getOperatorUsers() {
    var token = localStorage.getItem("jwt");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.rootURL + "operators", { headers })
  }

  getModeratorUsers() {
    var token = localStorage.getItem("jwt");
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.get(this.rootURL + "moderators", { headers })
  }

  getUser(email: string, token: string) {
    let httpParam = new HttpParams().set("Email", email);
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    const options = { params: httpParam, headers: headers };
    return this.http.get(this.rootURL + "getUserWithEmail", options);
  }

  addUser(newUser: UserDTO) {
    var token = localStorage.getItem("jwt");

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);

    var userFormData: FormData = new FormData();

    userFormData.append("Firstname", newUser.firstname);
    userFormData.append("Lastname", newUser.lastname);
    userFormData.append("Email", newUser.email);
    userFormData.append("Role", newUser.role);
    userFormData.append("PhoneNumber", newUser.phoneNumber);
    userFormData.append("Password", newUser.password);

    return this.http.post(this.rootURL, userFormData, { headers });
  }

  editUser(userToEdit: UserDTO) {
    var token = localStorage.getItem("jwt");

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);

    var userFormData: FormData = new FormData();

    userFormData.append("Id", userToEdit.id);
    userFormData.append("Firstname", userToEdit.firstname);
    userFormData.append("Lastname", userToEdit.lastname);
    userFormData.append("Email", userToEdit.email);
    userFormData.append("Role", userToEdit.role);
    userFormData.append("PhoneNumber", userToEdit.phoneNumber);
    userFormData.append("Password", userToEdit.password);

    return this.http.put(this.rootURL, userFormData, { headers });
  }

  deleteUser(id: string, token: string) {
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.delete(this.rootURL + id, { headers });
  }
}
