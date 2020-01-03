import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { EndpointsService } from "../services/config/endpoints.service";
import { GeneralService } from "../services/general.service";
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.css"]
})
export class TransactionsComponent implements OnInit {
  myplaceHolder = "Filter";
  filterStatus = "Activate";
  filterColumn = "Date";
  filterSearch;
  totalItemCount = 0;
  paginationUrl = {
    next: "",
    previous: "",
    viewCountStart: 1,
    viewCountEnd: 10
  };
  pageNumber = 1;
  dateFilter = { from: "", to: "" };
  displayedColumns: string[] = [
    "status",
    "index",
    "description",
    "paymentMode",
    "provider",
    "dateOfDelivery",
    "totalAmount",
    "action"
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
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
        ? this.getTransactions()
        : this.handleReloadOnPagination(pageNumber);
    });
  }

  ngOnInit() {}

  private getTransactions() {
    this.endpoints.fetchAllTransactions().subscribe((res: any) => {
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

    let projections = [];
    if (results.length > 0) {
      projections = results.map((element, i) => {
        !element.service_deliver_on
          ? (element.service_deliver_on = "Not Due")
          : element.service_deliver_on;
        return element;
      });

      this.dataSource = new MatTableDataSource(projections);
    } else {
      this.dataSource = new MatTableDataSource([]);
    }
  }

  applyFilter(filterValue: string) {
    if (filterValue.length > 0) {
      this.endpoints
        .fetchFilteredTransactions(filterValue.trim().toLowerCase())
        .subscribe(res => {
          console.log(res, "filted transactions");
          this.setDataSource(res);
        });
    } else {
      this.getTransactions();
      this.paginationUrl = {
        next: "",
        previous: "",
        viewCountStart: 1,
        viewCountEnd: 10
      };
    }
  }

  handleDateFilterActivation() {
    this.filterStatus === "Activate"
      ? (this.filterStatus = "Deactivate")
      : (this.filterStatus = "Activate");
  }

  handleDateFilter(value, type) {
    if (type === "from") {
      this.dateFilter.from = value;
    } else {
      this.dateFilter.to = value;
    }
    // if (Object.keys(this.dateFilter) === "") {
    // }
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
    this.router.navigate(["/transactionsInsight/pages/", pageNumber]);
  }

  handleReloadOnPagination(pageNumber) {
    // console.log(pageNumber, "hlo");
    this.endpoints
      .fetchPaginationPage(
        `http://204.48.22.223/dashboard/transactions/?page=${pageNumber}`
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

  hidShowPlaceHolder(value, type) {
    if (type === "onFocus" || value) {
      this.myplaceHolder = "";
      return;
    } else if (type === "onBlur" && !value) {
      this.myplaceHolder = "Filter";
      return;
    }
  }

  handleNavigation(username) {
    let redirect = "";
    this.route.snapshot.url.forEach((res: any) => {
      redirect += res.path + "/";
    });
    this.router.navigate(["/transactionsInsight", username], {
      queryParams: { redirectTo: redirect }
    });
  }

  handleDelete(id) {
    this.genServ.sweetAlertDeletions("Transaction").then(res => {
      if (res.value) {
        this.endpoints.deleteTransaction(id).subscribe(
          res => {
            console.log(res);
            this.genServ.sweetAlertSucess(
              "Transaction Deleted",
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
