import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { EndpointsService } from "../services/config/endpoints.service";
import { GeneralService } from "../services/general.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  myplaceHolder = "Filter";
  totalUserCount = 0;
  totalSessionsCount = 0;
  totalItemCount = 0;
  paginationUrl = {
    next: "",
    previous: "",
    viewCountStart: 1,
    viewCountEnd: 10
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
    private genServ: GeneralService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getSessions();
  }

  private getUsers() {
    this.endpoints.fetchAllUsers().subscribe((res: any) => {
      this.setDataSource(res);
    });
  }

  private setDataSource(res) {
    const { results, next, previous, count } = res;
    this.totalItemCount = count;
    // set pagination next, previous and page counts values
    this.paginationUrl = { ...this.paginationUrl, next, previous };
    // check if page is the lastnext, then set page count to total item count
    this.paginationUrl.next !== null
      ? this.paginationUrl
      : (this.paginationUrl.viewCountEnd = this.totalItemCount);
    // check if page is the lastprevious, then set page count to perPage count[10]
    this.paginationUrl.previous !== null
      ? this.paginationUrl
      : (this.paginationUrl.viewCountEnd = 10);
    // check if page is the single, then set page count to perPage count[count]
    count > this.paginationUrl.viewCountEnd
      ? this.paginationUrl
      : (this.paginationUrl.viewCountEnd = count);
    this.totalUserCount = count;
    this.dataSourceUsers = new MatTableDataSource(results);

    this.dataSourceUsers.sort = this.sort;
  }

  private getSessions() {
    this.endpoints.fetchAllSessions().subscribe((result: any) => {
      this.dataSourceSessions = result;
      this.totalSessionsCount = result.length;
    });
  }

  applyFilter(filterValue: string) {
    if (filterValue) {
      this.endpoints
        .fetchFilteredUsers(filterValue.trim().toLowerCase())
        .subscribe(res => {
          // console.log(res, "filted res");
          this.setDataSource(res);
        });
    } else {
      this.getUsers();
      this.paginationUrl = {
        next: "",
        previous: "",
        viewCountStart: 1,
        viewCountEnd: 10
      };
    }
  }

  handlePagination(type) {
    if (type === "next") {
      this.endpoints
        .fetchPaginationPage(this.paginationUrl.next)
        .subscribe(res => {
          // Add page view counts by 10 on nextView event
          this.paginationUrl = {
            ...this.paginationUrl,
            viewCountStart: this.paginationUrl.viewCountStart + 10,
            viewCountEnd: this.paginationUrl.viewCountEnd + 10
          };
          this.setDataSource(res);
        });
    } else if (type === "previous") {
      this.endpoints
        .fetchPaginationPage(this.paginationUrl.previous)
        .subscribe(res => {
          // Subtract page view counts by 10 on previousView event
          this.paginationUrl = {
            ...this.paginationUrl,
            viewCountStart: this.paginationUrl.viewCountStart - 10,
            viewCountEnd: this.paginationUrl.viewCountStart - 10 + 9
          };
          this.setDataSource(res);
        });
    }
  }

  handleNavigation(id) {
    let redirect = "";
    this.route.snapshot.url.forEach((res: any) => {
      redirect += res.path + "/";
    });
    this.router.navigate(["/transactionsInsight", id], {
      queryParams: { redirectTo: redirect }
    });
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
