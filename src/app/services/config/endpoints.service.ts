import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EndpointsService {
  private host = environment.apiUrl;
  public httpStatus = "allCalls";

  private usersUrl = {
    getAllUsers: "dashboard/users",
    getUpdateDeleteUser: "dashboard/user",
    filterUsers: "dashboard/users/?search="
  };

  public adminUsersUrl = {
    getAllAdminUsers: "staff/users",
    getUpdateDeleteAdminUser: "staff/update",
    filterAdminUsers: "staff/users/?search="
  };

  public transactionsUrl = {
    getAllTransactions: "dashboard/all-transaction",
    getUpdateDeleteTransaction: "dashboard/transaction",
    filterTransactions: "dashboard/all-transaction/?search=",
    dateRangeFilterTransaction: `dashboard/transactions`
  };

  private sessionsUrl = {
    getActiveSessions: "dashboard/active-session/"
  };

  public serviceUrl = {
    createService: "services/new-service/",
    getAllServices: "services/all-services"
  };

  public ratingUrl = {
    createRating: "rating/new",
    getUpdateDeleteRating: "rating/update",
    fetchRatingByUser: "rating/user",
    fetchUsersWithRatings: "dashboard/rated-users/all",
    filterRating: "dashboard/rated-users/all?search="
  };

  private settingsUrl = {
    getUpdateSettings: "dashboard/settings/"
  };

  private registerLoginUrl = {
    register: "staff/signup/",
    login: "staff/login/"
  };

  public changePassword = "/password-change/";

  constructor(private http: HttpClient) {}

  create(apiUrl, credentials) {
    try {
      return this.http.post(`${this.host}${apiUrl}`, credentials);
    } catch (error) {
      alert(error);
    }
  }

  fetch(apiUrl) {
    try {
      return this.http.get(`${this.host}${apiUrl}`);
    } catch (error) {
      alert(error);
    }
  }

  update(apiUrl, payload) {
    try {
      return this.http.put(`${this.host}${apiUrl}`, payload);
    } catch (error) {
      alert(error);
    }
  }

  filter(apiUrl, params) {
    try {
      return this.http.get(`${this.host}${apiUrl}${params}`);
    } catch (error) {
      alert(error);
    }
  }

  delete(apiUrl, selector) {
    try {
      return this.http.delete(`${this.host}${apiUrl}/${selector}`);
    } catch (error) {
      alert(error);
    }
  }

  // Users Endpoint
  fetchAllUsers() {
    try {
      return this.http.get(`${this.host}${this.usersUrl.getAllUsers}`);
    } catch (error) {
      alert(error);
    }
  }

  fetchFilteredUsers(params) {
    try {
      return this.http.get(`${this.host}${this.usersUrl.filterUsers}${params}`);
    } catch (error) {
      alert(error);
    }
  }

  fetchOneUser(username) {
    try {
      return this.http.get(
        `${this.host}${this.usersUrl.getUpdateDeleteUser}/${username}`
      );
    } catch (error) {
      alert(error);
    }
  }

  updateUser(username, payload) {
    try {
      return this.http.put(
        `${this.host}${this.usersUrl.getUpdateDeleteUser}/${username}`,
        payload
      );
    } catch (error) {
      alert(error);
    }
  }

  deleteUser(username) {
    try {
      return this.http.delete(
        `${this.host}${this.usersUrl.getUpdateDeleteUser}/${username}`
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
        `${this.host}${this.transactionsUrl.getAllTransactions}`
      );
    } catch (error) {
      alert(error);
    }
  }

  fetchOneTransaction(id) {
    try {
      return this.http.get(
        `${this.host}${this.transactionsUrl.getUpdateDeleteTransaction}/${id}`
      );
    } catch (error) {
      alert(error);
    }
  }
  fetchFilteredTransactions(params) {
    try {
      return this.http.get(
        `${this.host}${this.transactionsUrl.filterTransactions}${params}`
      );
    } catch (error) {
      alert(error);
    }
  }

  updateTransaction(id, payload) {
    try {
      return this.http.put(
        `${this.host}${this.transactionsUrl.getUpdateDeleteTransaction}/${id}`,
        payload
      );
    } catch (error) {
      alert(error);
    }
  }

  deleteTransaction(id) {
    try {
      return this.http.delete(
        `${this.host}${this.transactionsUrl.getUpdateDeleteTransaction}/${id}`
      );
    } catch (error) {
      alert(error);
    }
  }
  // Transactions Endpoint Ends

  // Sessions Endpoints

  fetchAllSessions() {
    try {
      return this.http.get(`${this.host}${this.sessionsUrl.getActiveSessions}`);
    } catch (error) {
      alert(error);
    }
  }
  //Sessions Endpoints End

  // Settings Endpoints
  fetchSettings() {
    try {
      return this.http.get(`${this.host}${this.settingsUrl.getUpdateSettings}`);
    } catch (error) {
      alert(error);
    }
  }

  updateSettings(payload) {
    try {
      return this.http.put(
        `${this.host}${this.settingsUrl.getUpdateSettings}`,
        payload
      );
    } catch (error) {
      alert(error);
    }
  }
  // Settings Endpoints Ends

  fetchFilteredRatings(params) {
    try {
      return this.http.get(
        `${this.host}${this.ratingUrl.filterRating}${params}`
      );
    } catch (error) {
      alert(error);
    }
  }

  // Paginating
  fetchPaginationPage(url) {
    try {
      return this.http.get(url);
    } catch (error) {
      alert(error);
    }
  }

  // Login and Register
  loginUser(credentials) {
    this.httpStatus = "login";
    try {
      return this.http.post(
        `${this.host}${this.registerLoginUrl.login}`,
        credentials
      );
    } catch (error) {
      alert(error);
    }
  }

  registerUser(credentials) {
    this.httpStatus = "login";
    try {
      return this.http.post(
        `${this.host}${this.registerLoginUrl.register}`,
        credentials
      );
    } catch (error) {
      alert(error);
    }
  }
}
