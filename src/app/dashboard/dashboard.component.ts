import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { EndpointsService } from "../services/config/endpoints.service";
import { GeneralService } from "../services/general.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  myplaceHolder = "Filter";
  totalUserCount = 0;
  totalSessionsCount = 0;
  paginationUrl = {
    next: "",
    previous: ""
  };
  callsInfo = {
    data: [[40, 60]],
    title: "IOS and Android Downloads",
    labels: ["IOS - 2, 40%", "Andriod - 0, 60%"]
  };

  displayedColumns: string[] = [
    "index",
    "firstName",
    "lastName",
    "accountType",
    "email",
    "phoneNumber",
    "action"
  ];
  dataSourceUsers: MatTableDataSource<any>;
  dataSourceSessions = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private endpoints: EndpointsService,
    private genServ: GeneralService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getSessions();
  }

  private getUsers() {
    this.endpoints.fetchAllUsers().subscribe((res: any) => {
      const { results, count, next, previous } = res;
      this.totalUserCount = count;
      this.paginationUrl = { next, previous };
      this.dataSourceUsers = new MatTableDataSource(results);
      this.dataSourceUsers.paginator = this.paginator;
      this.dataSourceUsers.sort = this.sort;
    });
  }

  private getSessions() {
    this.endpoints.fetchAllSessions().subscribe((result: any) => {
      const { results, count } = result;
      this.totalSessionsCount = count;
      this.dataSourceSessions = results;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSourceUsers.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceUsers.paginator) {
      this.dataSourceUsers.paginator.firstPage();
    }
  }

  hidShowPlaceHolder(value, type) {
    if (type === "onFocus" || value) {
      this.myplaceHolder = "";
      return;
    } else if (type === "onBlur" && !value) {
      this.myplaceHolder = "Filter";
      return;
    }
  }

  handleDelete(username) {
    this.genServ.sweetAlertDeletions("User").then(res => {
      if (res.value) {
        this.endpoints.deleteUser(username).subscribe(
          res => {
            this.getUsers();
            this.genServ.sweetAlertSucess(
              "User Deleted",
              "Deletion Successful"
            );
          },
          error => {
            console.log(error, "error on delete");
            this.genServ.sweetAlertError("Sorry, Delete Not Successful");
          }
        );
      }
    });
  }
}
