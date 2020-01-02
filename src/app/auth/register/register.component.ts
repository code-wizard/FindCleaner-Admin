import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "src/app/utils/localStorage.service";
import { GeneralService } from "src/app/services/general.service";
import { AuthService } from "../auth.service";
import { EndpointsService } from "src/app/services/config/endpoints.service";
import $ from "jquery";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  credentials = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    role: ""
  };
  test = new FormData();

  constructor(
    private endpoints: EndpointsService,
    private router: Router,
    private localStorage: LocalStorageService,
    private genServ: GeneralService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.test.append("res", "Join");
  }

  private get registerCredentials() {
    let validationFields = "";
    const obj = this.credentials;

    for (const key in obj) {
      if (!obj[key] && key !== "phone_number") {
        validationFields += `${key} cannot be blank <br/>`;
      }
    }
    return !validationFields ? { ...this.credentials } : validationFields;
  }

  handleRegister() {
    const credentials = this.registerCredentials;
    if (typeof credentials === "string") {
      this.genServ.sweetAlertHTML("Validation", credentials);
    } else {
      this.endpoints.registerUser(this.registerCredentials).subscribe(
        (res: any) => {
          console.log(res, "response");

          this.genServ
            .sweetAlertSucess(
              "Registration Successful",
              "Check your email to verify your account"
            )
            .then(res => {
              this.router.navigate([`/login`]);
            });
        },
        error => {
          // console.log(error.error.non_field_errors[0], "lol");
          this.genServ.sweetAlertAuthVerification(
            "Error!! User could not be registered"
          );
        }
      );
    }
  }
}
