import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {
  MatNativeDateModule,
  DateAdapter,
  MAT_DATE_FORMATS
} from "@angular/material";
import { MatMenuModule } from "@angular/material/menu";
import { ChartsModule } from "ng2-charts";

import { AppComponent } from "./app.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderNavComponent } from "./header-nav/header-nav.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ChartComponent } from "./shared/chart/components/chart.component";
import { UsersComponent } from "./users/users.component";
import { AuthcrudInterceptorService } from "./auth/auth-crud-interceptor.service";
import { UserViewComponent } from "./users/user-view/user-view.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { TransactionViewComponent } from "./transactions/transaction-view/transaction-view.component";
import { SettingsComponent } from "./settings/settings.component";
import { ShortenPipe } from "./shared/chart/pipes/shorten.pipe";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderNavComponent,
    DashboardComponent,
    ChartComponent,
    UsersComponent,
    UserViewComponent,
    TransactionsComponent,
    TransactionViewComponent,
    SettingsComponent,
    ShortenPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatMenuModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthcrudInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
