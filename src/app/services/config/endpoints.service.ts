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
    getUpdateDeleteUser: "dashboard/user",
    filterUsers: "dashboard/users/?search="
  };

  private transactionsUrl = {
    getAllTransactions: "dashboard/all-transaction",
    getUpdateDeleteTransaction: "dashboard/transaction"
  };

  private sessionsUrl = {
    getActiveSessions: "dashboard/active-session/"
  };

  private settingsUrl = {
    getUpdateSettings: "dashboard/settings/"
  };

  private loginUrl = "accounts/rest-auth/login/";

  constructor(private http: HttpClient) {}

  // Users Endpoint
  fetchAllUsers() {
    try {
      return this.http.get(`${this.apiUrl}${this.usersUrl.getAllUsers}`);
    } catch (error) {
      alert(error);
    }
  }

  fetchFilteredUsers(params) {
    try {
      return this.http.get(
        `${this.apiUrl}${this.usersUrl.filterUsers}${params}`
      );
    } catch (error) {
      alert(error);
    }
  }

  fetchOneUser(username) {
    try {
      return this.http.get(
        `${this.apiUrl}${this.usersUrl.getUpdateDeleteUser}/${username}`
      );
    } catch (error) {
      alert(error);
    }
  }

  updateUser(username, payload) {
    try {
      return this.http.put(
        `${this.apiUrl}${this.usersUrl.getUpdateDeleteUser}/${username}`,
        payload
      );
    } catch (error) {
      alert(error);
    }
  }

  deleteUser(username) {
    try {
      return this.http.delete(
        `${this.apiUrl}${this.usersUrl.getUpdateDeleteUser}/${username}`
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

  fetchOneTransaction(id) {
    try {
      return this.http.get(
        `${this.apiUrl}${this.transactionsUrl.getUpdateDeleteTransaction}/${id}`
      );
    } catch (error) {
      alert(error);
    }
  }

  updateTransaction(id, payload) {
    try {
      return this.http.put(
        `${this.apiUrl}${this.transactionsUrl.getUpdateDeleteTransaction}/${id}`,
        payload
      );
    } catch (error) {
      alert(error);
    }
  }

  deleteTransaction(id) {
    try {
      return this.http.delete(
        `${this.apiUrl}${this.transactionsUrl.getUpdateDeleteTransaction}/${id}`
      );
    } catch (error) {
      alert(error);
    }
  }
  // Transactions Endpoint Ends

  // Sessions Endpoints

  fetchAllSessions() {
    try {
      return this.http.get(
        `${this.apiUrl}${this.sessionsUrl.getActiveSessions}`
      );
    } catch (error) {
      alert(error);
    }
  }
  //Sessions Endpoints End

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

  // Login
  loginUser(credentials) {
    this.httpStatus = "login";
    try {
      return this.http.post(`${this.apiUrl}${this.loginUrl}`, credentials);
    } catch (error) {
      alert(error);
    }
  }
}
