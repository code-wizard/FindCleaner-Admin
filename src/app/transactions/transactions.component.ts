import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EndpointsService } from '../services/config/endpoints.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'description',
    // 'serviceOn',
    // 'expectedStartTime',
    // 'expectedNoOfHrs',
    'totalAmount',
    'status',
    'paymentMode',
    'dateOfDelivery',
    // 'service',
    // 'serviceProvider',
    // 'customer',
    'action',
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

  constructor(private endpoints: EndpointsService) {
  }

  ngOnInit() {
    this.endpoints.fetchAllTransactions().subscribe((result: any) => {
      console.log(result, 'reuls');
      const { users } = result;
      this.dataSource = new MatTableDataSource(users);
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

}
