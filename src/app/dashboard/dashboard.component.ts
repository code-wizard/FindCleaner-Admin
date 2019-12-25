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
  totalItemCount = 0;
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
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private endpoints: EndpointsService,
    private genServ: GeneralService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.endpoints.fetchAllUsers().subscribe((res: any) => {
      console.log(res, "reuls");
      const { results, count, next, previous } = res;
      this.totalItemCount = count;
      this.paginationUrl = { next, previous };
      this.dataSource = new MatTableDataSource(results);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
