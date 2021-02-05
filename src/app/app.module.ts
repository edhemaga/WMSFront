import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { AddMapComponent } from './components/Pathfinding/add-map/add-map.component';
import { PathfindingComponent } from './components/pathfinding/pathfinding.component';
import { HomeComponent } from './components/Home/home.component';
import { SidebarComponent } from './components/Sidebar/sidebar.component';
import { NavbarComponent } from './components/Navbar/navbar.component';
import { UsersComponent } from './components/WMS/Users/users.component';

const routes: Routes = [
  {
    path: 'users', component: UsersComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // AddMapComponent,
    PathfindingComponent,
    HomeComponent,
    SidebarComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [SidebarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
