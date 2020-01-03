import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { EndpointsService } from "src/app/services/config/endpoints.service";
import { Router, Params } from "@angular/router";
import { LocalStorageService } from "src/app/utils/localStorage.service";

@Component({
  selector: "app-admin-profile",
  templateUrl: "./admin-profile.component.html",
  styleUrls: ["./admin-profile.component.css"]
})
export class AdminProfileComponent implements OnInit {
  adminUserDetails: any = {};
  apiUrl;
  adminUserInfo;
  password = {
    new: "",
    confirm: ""
  };
  constructor(
    private genServ: GeneralService,
    private endpoints: EndpointsService,
    private route: Router,
    private localStorage: LocalStorageService
  ) {
    this.adminUserDetails = JSON.parse(
      this.localStorage.getFromLocalStorage("AdminUserInfo")
    );
    this.apiUrl = `${this.endpoints.adminUsersUrl.getUpdateDeleteAdminUser}/${this.adminUserDetails.id}`;
  }

  ngOnInit() {}

  private get updatedAdminUserDetails(): any {
    let validationFields = "";
    const obj = this.adminUserDetails;
    for (const key in obj) {
      if (obj[key] === undefined || obj[key] === null) {
        validationFields += `${key} cannot be blank <br/>`;
      }
    }
    return !validationFields ? { ...this.adminUserDetails } : validationFields;
  }

  handleUpdate() {
    const updatedAdminUserDetails = this.updatedAdminUserDetails;
    if (typeof updatedAdminUserDetails === "string") {
      this.genServ.sweetAlertHTML("Validation", updatedAdminUserDetails);
    } else {
      this.genServ.sweetAlertUpdates("Logged In Admin").then(response => {
        if (response.value) {
          this.endpoints.update(this.apiUrl, updatedAdminUserDetails).subscribe(
            res => {
              console.log(res);
              this.genServ.sweetAlertSucess(
                "Admin User Updated",
                "Update Successful"
              );
            },
            error => {
              console.log(error, "error on update");
              this.genServ.sweetAlertError("Sorry, Update Not Successful");
            }
          );
        }
      });
    }
  }

  handleChangedPassword() {
    if (this.password.new !== this.password.confirm) {
      this.genServ.sweetAlertError("Password Doesnt Match");
    } else {
      this.genServ.sweetAlertUpdates("Change Password").then(response => {
        if (response.value) {
          const apiUrl = this.endpoints.changePassword;
          this.endpoints.update(apiUrl, this.password.new).subscribe(
            res => {
              console.log(res);
              this.genServ.sweetAlertSucess(
                "Change Password",
                "Update Successful"
              );
            },
            error => {
              console.log(error, "error on update");
              this.genServ.sweetAlertError("Sorry, Update Not Successful");
            }
          );
        }
      });
    }
  }

  handleDelete() {
    this.genServ.sweetAlertDeletions("Logged In Admin").then(res => {
      if (res.value) {
        this.endpoints.deleteUser(this.adminUserDetails.username).subscribe(
          res => {
            console.log(res);
            this.genServ
              .sweetAlertSucess("Admin User Deleted", "Deletion Successful")
              .then(res => this.route.navigate(["/adminUsersInsight/pages/1"]));
          },
          error => {
            console.log(error, "error on delete");
            this.genServ.sweetAlertError("Sorry, Delete Not Successful");
          }
        );
      }
    });
  }
}
