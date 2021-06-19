import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faUsers, faWarehouse, faBox, faFileInvoice, faMapMarkedAlt, faCog, faExclamationTriangle, faChartBar, faArchive } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/models/DTOs/userDTO.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  faUsers = faUsers;
  faWarehouse = faWarehouse;
  faBox = faBox;
  faFileInvoice = faFileInvoice;
  faMapMarkedAlt = faMapMarkedAlt;
  faCog = faCog;
  faExclamationTriangle = faExclamationTriangle;
  faChartBar = faChartBar;
  faArchive = faArchive;

  currentUser: UserDTO;

  jwtHelper = new JwtHelperService();

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    var token = localStorage.getItem("jwt");
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.userService.getUser(decodedToken.aud, token).subscribe(data => {
      this.currentUser = data as UserDTO;
    });

  }

}
