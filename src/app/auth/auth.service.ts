import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "../utils/localStorage.service";
import { TokenVerification } from "../utils/TokenVerification";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLoggedIn = false;

  constructor(
    private localstorage: LocalStorageService,
    private token: TokenVerification,
    private router: Router
  ) {}

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login() {
    const token = JSON.parse(this.localstorage.getFromLocalStorage("token"));
    const status = this.token.verifyToken(token);
    // console.log(status, "1019");
    status ? (this.isLoggedIn = true) : (this.isLoggedIn = false);
    if (!status) {
      this.localstorage.deleteFromLocalStorage("token");
      this.localstorage.deleteFromLocalStorage("AdminUserInfo");
    }
    return status;
  }

  logout(): void {
    this.localstorage.deleteFromLocalStorage("token");
    this.localstorage.deleteFromLocalStorage("AdminUserInfo");
    this.isLoggedIn = false;
    this.router.navigate(["/login"]);
  }
}
