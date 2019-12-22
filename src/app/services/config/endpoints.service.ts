import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EndpointsService {
  private apiUrl = environment.apiUrl;
  public httpStatus = "allCalls";

  private usersUrl = {
    getAllUsers: "dashboard/users",
    getOneUser: "dashboard/user"
  };

  private transactionsUrl = {
    getAllTransactions: "dashboard/all-transaction/",
    getOneUser: "dashboard/transaction/{service_id}"
  };

  private settingsUrl = {
    getUpdateSettings: "dashboard/settings/"
  };

  constructor(private http: HttpClient) {}

  // Users Endpoint
  fetchAllUsers() {
    try {
      return this.http.get(`${this.apiUrl}${this.usersUrl.getAllUsers}`);
    } catch (error) {
      alert(error);
    }
  }

  fetchOneUser(username) {
    try {
      return this.http.get(
        `${this.apiUrl}${this.usersUrl.getOneUser}/${username}`
      );
    } catch (error) {
      alert(error);
    }
  }

  updateUser(username, payload) {
    this.httpStatus = "update";
    try {
      return this.http.put(
        `${this.apiUrl}${this.usersUrl.getOneUser}/${username}`,
        payload
      );
    } catch (error) {
      alert(error);
    }
  }
  // Users Endpoint Ends

  // Transactions Endpoint
  fetchAllTransactions() {
    try {
      return this.http.get(
        `${this.apiUrl}${this.transactionsUrl.getAllTransactions}`
      );
    } catch (error) {
      alert(error);
    }
  }
  // Transactions Endpoint Ends

  // Settings Endpoints
  fetchSettings() {
    try {
      return this.http.get(
        `${this.apiUrl}${this.settingsUrl.getUpdateSettings}`
      );
    } catch (error) {
      alert(error);
    }
  }

  updateSettings(payload) {
    try {
      return this.http.put(
        `${this.apiUrl}${this.settingsUrl.getUpdateSettings}`,
        payload
      );
    } catch (error) {
      alert(error);
    }
  }
  // Settings Endpoints Ends

  // Paginating
  fetchPaginationPage(url) {
    try {
      return this.http.get(url);
    } catch (error) {
      alert(error);
    }
  }
}
