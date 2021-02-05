import { Component, OnInit } from '@angular/core';
import { faUsers, faWarehouse, faBox, faFileInvoice, faMapMarkedAlt, faCog, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {

  }

}
