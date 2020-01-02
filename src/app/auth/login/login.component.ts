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
    let validationFields = "";
    const obj = this.credentials;

    for (const key in obj) {
      if (!obj[key] && key !== "phone_number") {
        validationFields += `${key} cannot be blank <br/>`;
      }
    }
    return !validationFields ? { ...this.credentials } : validationFields;
  }

  handleLogin() {
    const credentials = this.loginCredentials;
    if (typeof credentials === "string") {
      this.genServ.sweetAlertHTML("Validation", credentials);
    } else {
      this.endpoints.loginUser(credentials).subscribe(
        (res: any) => {
          console.log(res, "respinse");
          const {
            token,
            user: { is_staff }
          } = res.user;
          if (is_staff) {
            this.localStorage.saveToLocalStorage("token", token);
            this.localStorage.saveToLocalStorage(
              "AdminUserInfo",
              res.user.user
            );
            this.endpoints.httpStatus = "allCalls"; // reset all other api calls headers
            const redirect = this.authService.redirectUrl
              ? this.authService.redirectUrl
              : "/adminDashboard";
            this.router.navigate([`${redirect}`]);
          } else {
            this.genServ.sweetAlertAuthVerification("User is not an Admin");
          }
        },
        error => {
          const {
            error: { non_field_errors }
          } = error;
          console.log(non_field_errors[0], "lol");
          this.genServ.sweetAlertAuthVerification(
            "Invalid Credentials. Make sure your account is verified"
          );
        }
      );
    }
  }
}
