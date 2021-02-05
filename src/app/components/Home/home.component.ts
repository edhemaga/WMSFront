import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(100, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(100, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  sideBarToggle: boolean = true;

  constructor() { }
  ngOnInit(): void {
  }

  public toggleSidebar(sideBarToggleRef: boolean) {
    if (this.sideBarToggle == true) {
      this.sideBarToggle = false;
      setTimeout(function () { document.getElementById("wrapper").style.display = "block"; }, 99);
    } else {
      setTimeout(function () { }, 99); //set delay
      this.sideBarToggle = true;
      document.getElementById("wrapper").style.display = "grid";
    }
  }

}
