import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faBars, faSignOutAlt, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { SidebarComponent } from '../Sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  @Output() toggleMenuEmitter = new EventEmitter<any>();

  faBars = faBars;
  faSignOutAlt = faSignOutAlt;
  faInfoCircle = faInfoCircle;
  faUser = faUser;

  sideBarComp: SidebarComponent;

  menuOpen: boolean = false;

  constructor() { }

  sideBarToggle: boolean = true;;

  ngOnInit(): void {
  }

  toggleMenu() {
    this.toggleMenuEmitter.emit(this.sideBarToggle);

    if (this.menuOpen == true) {
      this.menuOpen = false;
      // document.getElementById("toggleBtn").style.background = "rgba(37, 53, 68, 0.1)";
    } else {
      this.menuOpen = true;
    }
  }

  logOut() {
    localStorage.removeItem("jwt");
  }
}
