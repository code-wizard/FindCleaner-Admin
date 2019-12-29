import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "src/app/utils/localStorage.service";
import { GeneralService } from "src/app/services/general.service";
import { AuthService } from "../auth.service";
import { EndpointsService } from "src/app/services/config/endpoints.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  credentials = {
    username: "",
    email: "",
    password: "",
    role: ""
  };
  constructor(
    private endpoints: EndpointsService,
    private router: Router,
    private localStorage: LocalStorageService,
    private genServ: GeneralService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  private get registerCredentials() {
    const regExp = /\S+@\S+\.\S+/;
    if (regExp.test(this.credentials.username)) {
      this.credentials.email = this.credentials.username;
      this.credentials.username = "";
    }
    return { ...this.credentials };
  }

  handleLogin() {
    const credentials = this.registerCredentials;
    this.endpoints.registerUser(credentials).subscribe(
      (res: any) => {
        // const {
        //   token,
        //   user: { is_staff }
        // } = res;
        // if (is_staff) {
        //   this.localStorage.saveToLocalStorage("token", token);
        //   this.localStorage.saveToLocalStorage("AdminUserInfo", res.user);
        //   this.endpoints.httpStatus = "allCalls";
        //   const redirect = this.authService.redirectUrl
        //     ? this.authService.redirectUrl
        //     : "/adminDashboard";
        //   this.router.navigate([`${redirect}`]);
        // } else {
        //   this.genServ.sweetAlertAuthVerification("User is not an Admin");
        // }
      },
      error => {
        // console.log(error.error.non_field_errors[0], "lol");
        // this.genServ.sweetAlertAuthVerification("Invalid Credentials");
      }
    );
  }
}
