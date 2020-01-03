import { Component, OnInit } from "@angular/core";
import { EndpointsService } from "src/app/services/config/endpoints.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "src/app/utils/localStorage.service";
import { GeneralService } from "src/app/services/general.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-add-admin",
  templateUrl: "./add-admin.component.html",
  styleUrls: ["./add-admin.component.css"]
})
export class AddAdminComponent implements OnInit {
  credentials = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
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
      this.genServ.sweetAlertCreate("Admin User").then(response => {
        if (response.value) {
          this.endpoints.registerUser(this.registerCredentials).subscribe(
            (res: any) => {
              console.log(res, "response");

              this.genServ
                .sweetAlertSucess(
                  "Registration Successful",
                  "Check your email to verify your account"
                )
                .then(res => {
                  // clear form fields
                  this.credentials = {
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    phone_number: "",
                    role: ""
                  };
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
      });
    }
  }
}
