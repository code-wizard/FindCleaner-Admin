import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { EndpointsService } from "../services/config/endpoints.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  myplaceHolder = "Filter";
  totalItemCount = 0;
  paginationUrl = {
    next: "",
    previous: ""
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

  constructor(private endpoints: EndpointsService) {}

  ngOnInit() {
    this.endpoints.fetchAllUsers().subscribe((res: any) => {
      // console.log(res, "rusers");
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

  checkPlaceHolder(value, type) {
    if (type === "onFocus" || value) {
      this.myplaceHolder = "";
      return;
    } else if (type === "onBlur" && !value) {
      this.myplaceHolder = "Filter";
      return;
    }
  }

  handlePagination(event) {
    console.log("working", event, this.paginationUrl);
    this.endpoints.fetchPaginationPage;
  }
}
