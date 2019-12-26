import { Component, OnInit, ViewChild } from "@angular/core";
import { EndpointsService } from "../services/config/endpoints.service";
import { GeneralService } from "../services/general.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

@Component({
  selector: "app-sessions",
  templateUrl: "./sessions.component.html",
  styleUrls: ["./sessions.component.css"]
})
export class SessionsComponent implements OnInit {
  myplaceHolder = "Filter";
  filterStatus = "Activate";
  filterColumn = "Date";
  filterSearch;
  displayedColumns: string[] = [
    "status",
    "index",
    "description",
    "paymentMode",
    "provider",
    "totalAmount",
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
    this.endpoints.fetchAllSessions().subscribe((result: any) => {
      const projections = result.results.map((element, i) => {
        const count = { count: `TRANS-00${i + 1}` };
        return { ...element, ...count };
      });
      !projections[0].service_deliver_on
        ? (projections[0].service_deliver_on = "Not Due")
        : projections[0].service_deliver_on;
      // console.log(projections, "sessions");
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

  // handleDateFilterActivation() {
  //   this.filterStatus === "Activate"
  //     ? (this.filterStatus = "Deactivate")
  //     : (this.filterStatus = "Activate");
  // }

  // handleDateFilter(value) {
  //   this.filterSearch = value;
  // }

  hidShowPlaceHolder(value, type) {
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
