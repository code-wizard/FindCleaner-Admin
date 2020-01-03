import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";
import { EndpointsService } from "../services/config/endpoints.service";
import { GeneralService } from "../services/general.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-admin-users",
  templateUrl: "./admin-users.component.html",
  styleUrls: ["./admin-users.component.css"]
})
export class AdminUsersComponent implements OnInit {
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
    "role",
    "email",
    "isActive",
    "dateJoined",
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
        ? this.getAdminUsers()
        : this.handleReloadOnPagination(pageNumber);
    });
  }

  ngOnInit() {}

  private getAdminUsers() {
    const apiUrl = this.endpoints.adminUsersUrl.getAllAdminUsers;
    this.endpoints.fetch(`${apiUrl}?ordering=-user`).subscribe((res: any) => {
      this.paginationUrl.viewCountStart = 1;
      this.setDataSource(res);
      console.log(res, "adminuers");
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
  }

  applyFilter(filterValue: string) {
    if (filterValue) {
      const apiUrl = this.endpoints.adminUsersUrl.filterAdminUsers;
      const params = filterValue.trim().toLowerCase();
      this.endpoints.filter(apiUrl, params).subscribe(res => {
        // console.log(res, "filted res");
        this.setDataSource(res);
      });
    } else {
      this.getAdminUsers();
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
    this.router.navigate(["/adminUsersInsight/pages/", pageNumber]);
    this.scrollToTop();
  }

  handleReloadOnPagination(pageNumber) {
    // console.log(pageNumber, "hlo");
    this.endpoints
      .fetchPaginationPage(
        `http://204.48.22.223/staff/users/?page=${pageNumber}`
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
    if (this.filterStatus === "Activate") {
      this.filterStatus = "Deactivate";
    } else {
      this.filterStatus = "Activate";
      this.getAdminUsers();
    }
  }

  handleDelete(id) {
    this.genServ.sweetAlertDeletions("Admin User").then(res => {
      if (res.value) {
        const apiUrl = this.endpoints.adminUsersUrl.getUpdateDeleteAdminUser;
        this.endpoints.delete(apiUrl, id).subscribe(
          res => {
            this.getAdminUsers();
            this.genServ.sweetAlertSucess(
              "Admin User Deleted",
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

  handleNavigation(id) {
    let redirect = "";
    this.route.snapshot.url.forEach((res: any) => {
      redirect += res.path + "/";
    });
    this.router.navigate(["/adminUsersInsight", id], {
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
