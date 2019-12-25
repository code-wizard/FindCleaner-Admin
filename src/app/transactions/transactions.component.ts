import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { EndpointsService } from "../services/config/endpoints.service";
import { GeneralService } from "../services/general.service";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.css"]
})
export class TransactionsComponent implements OnInit {
  myplaceHolder = "Filter";
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

  // {
  //   "requirement_description": "string",
  //   "service_required_on": "string",
  //   "expected_start_time": "string",
  //   "expected_hours_to_complete": "string",
  //   "total_amount": 0,
  //   "status": "string",
  //   "payment_mode": "string",
  //   "service_deliver_on": "string",
  //   "service": 0,
  //   "service_provider": 0,
  //   "customer": 0
  // }

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private endpoints: EndpointsService,
    private genServ: GeneralService
  ) {}

  ngOnInit() {
    this.endpoints.fetchAllTransactions().subscribe((result: any) => {
      const projections = result.map((element, i) => {
        const count = { count: `TRANS-00${i + 1}` };
        return { ...element, ...count };
      });

      // console.log(projections, "transactions");
      this.dataSource = new MatTableDataSource(projections);
      this.dataSource.paginator = this.paginator;
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
