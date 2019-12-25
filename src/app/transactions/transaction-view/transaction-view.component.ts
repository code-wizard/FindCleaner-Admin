import { Component, OnInit } from "@angular/core";
import { EndpointsService } from "src/app/services/config/endpoints.service";
import { GeneralService } from "src/app/services/general.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-transaction-view",
  templateUrl: "./transaction-view.component.html",
  styleUrls: ["./transaction-view.component.css"]
})
export class TransactionViewComponent implements OnInit {
  transactionDetails: any = {};
  filter = "provider";
  filterContainer = [];
  allTransactions = new BehaviorSubject<any>("");

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
          // console.log(res, "eachtrans");
          this.subscribeToAllTransactions();
        });
    });
  }

  private subscribeToAllTransactions() {
    this.endpoints.fetchAllTransactions().forEach(res => {
      this.allTransactions.next(res);
      this.getSimilarTransactions(this.filter);
    });
  }

  private get updatedTransactionDetails(): any {
    let validationFields = "";
    const obj = this.transactionDetails;

    for (const key in obj) {
      if (!obj[key] && key !== "service_deliver_on") {
        validationFields += `${key} cannot be blank <br/>`;
      }
    }
    return !validationFields
      ? { ...this.transactionDetails }
      : validationFields;
  }

  private getSimilarTransactions(filter) {
    this.filterContainer = [];
    this.allTransactions.forEach((res: any) => {
      res.forEach(element => {
        if (
          filter === "provider" &&
          element.service_provider.name ===
            this.transactionDetails.service_provider.name &&
          element.id !== this.transactionDetails.id
        ) {
          this.filterContainer.push(element);
        } else if (
          filter === "customer" &&
          element.customer.name === this.transactionDetails.customer.name &&
          element.id !== this.transactionDetails.id
        ) {
          this.filterContainer.push(element);
        }
      });
    });
  }

  ngOnInit() {}

  handleUpdate() {
    const updatedTransactionDetails = this.updatedTransactionDetails;
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
}
