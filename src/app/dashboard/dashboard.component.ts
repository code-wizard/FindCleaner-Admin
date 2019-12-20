import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EndpointsService } from '../services/config/endpoints.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  callsInfo = {
    data: [[40, 60]],
    title: 'IOS and Android Downloads',
    labels: ['IOS - 2, 40%', 'Andriod - 0, 60%'],
  };

  displayedColumns: string[] = [
    'index',
    'firstName',
    'lastName',
    'accountType',
    'email',
    'phoneNumber'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private endpoints: EndpointsService) {
  }

  ngOnInit() {
    this.endpoints.fetchAllUsers().subscribe((result: any) => {
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

