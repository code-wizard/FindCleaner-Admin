import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { EndpointsService } from "src/app/services/config/endpoints.service";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-admin-user-view",
  templateUrl: "./admin-user-view.component.html",
  styleUrls: ["./admin-user-view.component.css"]
})
export class AdminUserViewComponent implements OnInit {
  adminUserDetails: any = {};
  constructor(
    private genServ: GeneralService,
    private endpoints: EndpointsService,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.router.params.subscribe((res: Params) => {
      const { adminId } = res;
      const apiUrl = `${this.endpoints.adminUsersUrl.getUpdateDeleteAdminUser}/${adminId}`;
      this.endpoints.fetch(apiUrl).subscribe(res => {
        console.log(res, "resAdminUsers");
        this.adminUserDetails = res;
      });
    });
  }

  ngOnInit() {}

  private get updatedAdminUserDetails(): any {
    let validationFields = "";
    const obj = this.adminUserDetails;

    for (const key in obj) {
      if (!obj[key]) {
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
      this.genServ.sweetAlertUpdates("Users").then(response => {
        if (response.value) {
          this.endpoints
            .updateUser(
              updatedAdminUserDetails.username,
              updatedAdminUserDetails
            )
            .subscribe(
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

  handleDelete() {
    this.genServ.sweetAlertDeletions("Admin User").then(res => {
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

  backToPreviousPage() {
    this.route.navigate([this.router.snapshot.queryParams.redirectTo]);
  }
}
