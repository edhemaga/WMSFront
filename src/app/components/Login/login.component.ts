import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/userCredentials.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading = false;

  loginForm: FormGroup;

  constructor(public LoginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    });
  }

  loginSubmit() {
    this.loading = true;
    let userCredentials: UserCredentials = {
      Email: this.loginForm.value.email,
      Password: this.loginForm.value.password
    }
    this.LoginService.login(userCredentials).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.router.navigate(["/home/items"]);
      this.loading = false;
    }, () => {
      this.loading = false;
    });

  }

}
