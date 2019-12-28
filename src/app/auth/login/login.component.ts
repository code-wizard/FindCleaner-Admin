import { Component, OnInit } from "@angular/core";
import { EndpointsService } from "src/app/services/config/endpoints.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "src/app/utils/localStorage.service";
import { GeneralService } from "src/app/services/general.service";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  credentials = {
    username: "",
    email: "",
    password: ""
  };
  constructor(
    private endpoints: EndpointsService,
    private router: Router,
    private localStorage: LocalStorageService,
    private genServ: GeneralService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  private get loginCredentials() {
    const regExp = /\S+@\S+\.\S+/;
    if (regExp.test(this.credentials.username)) {
      this.credentials.email = this.credentials.username;
      this.credentials.username = "";
    }
    return { ...this.credentials };
  }

  handleLogin() {
    const credentials = this.loginCredentials;
    this.endpoints.loginUser(credentials).subscribe(
      (res: any) => {
        const {
          token,
          user: { is_staff }
        } = res;
        if (is_staff) {
          this.localStorage.saveToLocalStorage("token", token);
          this.localStorage.saveToLocalStorage("AdminUserInfo", res.user);
          this.endpoints.httpStatus = "allCalls";
          const redirect = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : "/adminDashboard";
          this.router.navigate([`${redirect}`]);
        } else {
          this.genServ.sweetAlertAuthVerification("User is not an Admin");
        }
      },
      error => {
        // console.log(error.error.non_field_errors[0], "lol");
        this.genServ.sweetAlertAuthVerification("Invalid Credentials");
      }
    );
  }
}
