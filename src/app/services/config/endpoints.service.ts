import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {
  private apiUrl = environment.apiUrl;
  public httpStatus = 'allCalls';

  private usersUrl = {
    getAllUsers: 'dashboard/users',
    getOneUser: 'dashboard/user/'
  };

  private transactionsUrl = {
    getAllTransactions: 'dashboard/all-transaction/',
    getOneUser: 'dashboard/transaction/{service_id}'
  };

  constructor(private http: HttpClient) {}

  fetchAllUsers() {
    try {
      return this.http.get(`${this.apiUrl}${this.usersUrl.getAllUsers}`);
    } catch (error) {
      alert(error);
    }
  }

  fetchAllTransactions() {
    try {
      return this.http.get(`${this.apiUrl}${this.transactionsUrl.getAllTransactions}`);
    } catch (error) {
      alert(error);
    }
  }
}
