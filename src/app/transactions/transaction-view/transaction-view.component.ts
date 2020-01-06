import { Component, OnInit } from "@angular/core";
import { EndpointsService } from "src/app/services/config/endpoints.service";
import { GeneralService } from "src/app/services/general.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-transaction-view",
  templateUrl: "./transaction-view.component.html",
  styleUrls: ["./transaction-view.component.css"]
})
export class TransactionViewComponent implements OnInit {
  transactionDetails: any = {};
  filter = "provider";
  totalItemCount = 0;
  paginationUrl = {
    next: "",
    previous: "",
    viewCountStart: 1,
    viewCountEnd: 10
  };

  filterContainer = [];

  constructor(
    private endpoints: EndpointsService,
    private genServ: GeneralService,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.router.params.subscribe((res: Params) => {
      const { transactionId } = res;
      this.endpoints
        .fetchOneTransaction(transactionId)
        .subscribe((res: any) => {
          this.transactionDetails = res;
          this.handleSimilarTransactions();
          // console.log(res, "eachtrans");
        });
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

    if (results.length > 0) {
      const projections = results.map((element, i) => {
        const count = { count: `TRANS-00${i + 1}` };
        return { ...element, ...count };
      });

      !projections[0].service_deliver_on
        ? (projections[0].service_deliver_on = "Not Due")
        : projections[0].service_deliver_on;
      // console.log(projections, "transactions");
      this.filterContainer = projections;
    } else {
      this.filterContainer = [];
    }
  }

  private get updatedTransactionDetails(): any {
    let validationFields = "";
    const obj = this.transactionDetails;

    for (const key in obj) {
      if (
        !obj[key] &&
        key !== "service_deliver_on" &&
        key !== "coords" &&
        key !== "address"
      ) {
        validationFields += `${key} cannot be blank <br/>`;
      }
    }
    return !validationFields
      ? { ...this.transactionDetails }
      : validationFields;
  }

  private getSimilarTransactions(filter) {
    let name = "";
    if (filter === "provider") {
      name = this.transactionDetails.service_provider.name.split(" ");
      name = name[0];
    } else if (filter === "customer") {
      name = this.transactionDetails.customer.name.split(" ");
      name = name[0];
    }

    this.endpoints
      .fetchFilteredTransactions(name.trim().toLowerCase())
      .subscribe((res: any) => {
        const { results, count } = res;
        const { created_at } = this.transactionDetails;
        for (const result of results) {
          if (result.created_at === created_at) {
            results.splice(results.indexOf(result), 1);
            res.count = count - 1;
          }
        }
        // console.log(res, "filted transactions");
        this.setDataSource(res);
      });
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
      ? Number(url.substring(pageNumberIndex))
      : 1;
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

  ngOnInit() {}

  handleUpdate() {
    const updatedTransactionDetails = this.updatedTransactionDetails;
    // console.log(updatedTransactionDetails, "update");
    if (typeof updatedTransactionDetails === "string") {
      this.genServ.sweetAlertHTML("Validation", updatedTransactionDetails);
    } else {
      this.genServ.sweetAlertUpdates("Transaction").then(response => {
        if (response.value) {
          this.endpoints
            .updateTransaction(
              updatedTransactionDetails.id,
              updatedTransactionDetails
            )
            .subscribe(
              res => {
                console.log(res);
                this.genServ.sweetAlertSucess(
                  "Transaction Updated",
                  "Update Successful"
                );
              },
              error => {
                console.log(error, "error on update");
                this.genServ.sweetAlertError("Sorry, Update Not Successful");
              }
            );
        }
      });
    }
  }

  handleSimilarTransactions() {
    this.getSimilarTransactions(this.filter);
  }

  handleDelete() {
    this.genServ.sweetAlertDeletions("Transaction").then(res => {
      if (res.value) {
        this.endpoints.deleteTransaction(this.transactionDetails.id).subscribe(
          res => {
            console.log(res);
            this.genServ
              .sweetAlertSucess("Transaction Deleted", "Deletion Successful")
              .then(res => this.route.navigate(["/transactionsInsight"]));
          },
          error => {
            console.log(error, "error on delete");
            this.genServ.sweetAlertError("Sorry, Delete Not Successful");
          }
        );
      }
    });
  }

  backToPreviousPage() {
    this.route.navigate([this.router.snapshot.queryParams.redirectTo]);
  }
}
