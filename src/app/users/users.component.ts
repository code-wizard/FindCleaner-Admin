import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatTableDataSource } from "@angular/material";
import { EndpointsService } from "../services/config/endpoints.service";
import { GeneralService } from "../services/general.service";
import * as $ from "jquery";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  myplaceHolder = "Filter";
  filterStatus = "Activate";
  totalItemCount = 0;
  paginationUrl = {
    next: "",
    previous: "",
    viewCountStart: 1,
    viewCountEnd: 10
  };
  pageNumber = 1;
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

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private endpoints: EndpointsService,
    private genServ: GeneralService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((par: Params) => {
      const { pageNumber } = par;
      Number(pageNumber) === 1
        ? this.getUsers()
        : this.handleReloadOnPagination(pageNumber);
    });
  }

  ngOnInit() {}

  private getUsers() {
    this.endpoints.fetchAllUsers().subscribe((res: any) => {
      this.paginationUrl.viewCountStart = 1;
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
    this.dataSource = new MatTableDataSource(results);

    this.dataSource.sort = this.sort;
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

  hidShowPlaceHolder(value, type) {
    if (type === "onFocus" || value) {
      this.myplaceHolder = "";
      return;
    } else if (type === "onBlur" && !value) {
      this.myplaceHolder = "Filter";
      return;
    }
  }

  handlePagination(type) {
    let url: string;
    if (type === "next") {
      url = this.paginationUrl.next;
    } else if (type === "previous") {
      url = this.paginationUrl.previous;
    }
    const pageNumberIndex = url.indexOf("page=") + 5;
    // set pagenavigation to 1 on last previous -> indexOf will give wrong value
    const pageNumber = url.includes("page=")
      ? url.substring(pageNumberIndex)
      : 1;
    this.router.navigate(["/usersInsight/pages/", pageNumber]);
    this.scrollToTop();

    // if (type === "next") {
    //   // this.pageNumber = Number(pageNumber);

    //   this.endpoints
    //     .fetchPaginationPage(this.paginationUrl.next)
    //     .subscribe(res => {
    //       // Add page view counts by 10 on nextView event
    //       this.paginationUrl = {
    //         ...this.paginationUrl,
    //         viewCountStart: this.paginationUrl.viewCountStart + 10,
    //         viewCountEnd: this.paginationUrl.viewCountEnd + 10
    //       };
    //       this.setDataSource(res);
    //       this.router.navigate(["/usersInsight/pages/", pageNumber]);
    //     });
    // } else if (type === "previous") {

    //   this.endpoints
    //     .fetchPaginationPage(this.paginationUrl.previous)
    //     .subscribe(res => {
    //       // Subtract page view counts by 10 on previousView event
    //       this.paginationUrl = {
    //         ...this.paginationUrl,
    //         viewCountStart: this.paginationUrl.viewCountStart - 10,
    //         viewCountEnd: this.paginationUrl.viewCountStart - 10 + 9
    //       };
    //       this.setDataSource(res);
    //       this.router.navigate(["/usersInsight/pages/", pageNumber]);
    //     });
    // }
  }

  handleReloadOnPagination(pageNumber) {
    console.log(pageNumber, "hlo");
    this.endpoints
      .fetchPaginationPage(
        `http://204.48.22.223/dashboard/users/?page=${pageNumber}`
      )
      .subscribe(res => {
        this.paginationUrl = {
          ...this.paginationUrl,
          viewCountStart: 10 * pageNumber + 1 - 10,
          viewCountEnd: 10 * pageNumber
        };
        this.setDataSource(res);
      });
  }

  handleAcctTypeFilterActivation() {
    this.filterStatus === "Activate"
      ? (this.filterStatus = "Deactivate")
      : (this.filterStatus = "Activate");
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

  handleNavigation(username) {
    let redirect = "";
    this.route.snapshot.url.forEach((res: any) => {
      redirect += res.path + "/";
    });
    this.router.navigate(["/usersInsight", username], {
      queryParams: { redirectTo: redirect }
    });
  }

  scrollToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
