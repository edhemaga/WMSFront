import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from '../app/authGuard/authGuard';
import { LoggedInAuthGuard } from '../app/authGuard/loggedInAuthGuard';

import { HomeComponent } from './components/Home/home.component';
import { SidebarComponent } from './components/Sidebar/sidebar.component';
import { NavbarComponent } from './components/Navbar/navbar.component';
import { UsersComponent } from './components/WMS/Users/users.component';
import { WarehousesComponent } from './components/WMS/Warehouses/warehouses.component';
import { ItemsComponent } from './components/WMS/Items/items.component';
import { OrdersComponent } from './components/WMS/Orders/orders.component';
import { ProblemReportsComponent } from './components/WMS/Problem-reports/problem-reports.component';
import { LoginComponent } from './components/Login/login.component';
import { DeleteConfirmationComponent } from './components/WMS/Items/delete-confirmation/delete-confirmation.component';
import { ItemEditComponent } from './components/WMS/Items/item-edit/item-edit.component';
import { AddItemComponent } from './components/WMS/Items/add-item/add-item.component';
import { JwtModule } from '@auth0/angular-jwt';
import { IncreaseQuantityComponent } from './components/WMS/Items/increase-quantity/increase-quantity.component';
import { DecreaseQuantityComponent } from './components/WMS/Items/decrease-quantity/decrease-quantity.component';
import { AddUserComponent } from './components/WMS/Users/add-user/add-user.component';
import { UserDeleteConfirmationComponent } from './components/WMS/Users/user-delete-confirmation/user-delete-confirmation.component';
import { UserEditComponent } from './components/WMS/Users/user-edit/user-edit.component';
import { AddWarehouseComponent } from './components/WMS/Warehouses/add-warehouse/add-warehouse.component';
import { ItemDetailsComponent } from './components/WMS/Items/item-details/item-details.component';
import { ConfigWarehouseComponent } from './components/WMS/Warehouses/config-warehouse/config-warehouse.component';

import { DrawingGridModule } from 'ngx-drawing-grid';
import { IncomingComponent } from './components/WMS/Orders/incoming/incoming.component';
import { OutgoingComponent } from './components/WMS/Orders/outgoing/outgoing.component';
import { StatisticsComponent } from './components/WMS/statistics/statistics.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'warehouses', component: WarehousesComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'config/:id', component: ConfigWarehouseComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'problem', component: ProblemReportsComponent },
    ]
  },
  { path: 'logout', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard] },
  { path: '', component: LoginComponent, canActivate: [LoggedInAuthGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SidebarComponent,
    UsersComponent,
    WarehousesComponent,
    ItemsComponent,
    OrdersComponent,
    ProblemReportsComponent,
    LoginComponent,
    DeleteConfirmationComponent,
    ItemEditComponent,
    AddItemComponent,
    IncreaseQuantityComponent,
    DecreaseQuantityComponent,
    AddUserComponent,
    UserDeleteConfirmationComponent,
    UserEditComponent,
    AddWarehouseComponent,
    ItemDetailsComponent,
    ConfigWarehouseComponent,
    IncomingComponent,
    OutgoingComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
    FontAwesomeModule,
    NgxDatatableModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ["localhost:44372"],
        // blacklistedRoutes: []
      }
    }),
    DrawingGridModule
  ],
  exports: [RouterModule],
  providers: [SidebarComponent, DeleteConfirmationComponent, DatePipe, AuthGuard, LoggedInAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
