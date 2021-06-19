import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class LoggedInAuthGuard implements CanActivate {
    constructor(private jwtHelper: JwtHelperService, private router: Router) {
    }

    canActivate() {
        var token = localStorage.getItem("jwt");
        if (token == null) {
            return true;
        } else {
            if (!this.jwtHelper.isTokenExpired(token)) {
                this.router.navigate(["/home/items"]);
                return false;
            } else {
                return true;
            }
        }
    }
}