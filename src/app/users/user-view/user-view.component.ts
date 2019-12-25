import { Component, OnInit } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { EndpointsService } from "src/app/services/config/endpoints.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-user-view",
  templateUrl: "./user-view.component.html",
  styleUrls: ["./user-view.component.css"]
})
export class UserViewComponent implements OnInit {
  userDetails: any = {};
  constructor(
    private genServ: GeneralService,
    private endpoints: EndpointsService,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.router.params.subscribe((res: Params) => {
      const { username } = res;
      this.endpoints.fetchOneUser(username).subscribe(res => {
        this.userDetails = res;
        // console.log(res, "resUsers");
      });
    });
  }

  ngOnInit() {}

  private get updatedUserDetails(): any {
    let validationFields = "";
    const obj = this.userDetails;

    for (const key in obj) {
      if (!obj[key]) {
        validationFields += `${key} cannot be blank <br/>`;
      }
    }
    return !validationFields ? { ...this.userDetails } : validationFields;
  }

  handleUpdate() {
    const updatedUserDetails = this.updatedUserDetails;
    if (typeof updatedUserDetails === "string") {
      this.genServ.sweetAlertHTML("Validation", updatedUserDetails);
    } else {
      this.genServ.sweetAlertUpdates("Users").then(response => {
        if (response.value) {
          this.endpoints
            .updateUser(updatedUserDetails.username, updatedUserDetails)
            .subscribe(
              res => {
                console.log(res);
                this.genServ.sweetAlertSucess(
                  "User Updated",
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
    this.genServ.sweetAlertDeletions("User").then(res => {
      if (res.value) {
        this.endpoints.deleteUser(this.userDetails.username).subscribe(
          res => {
            console.log(res);
            this.genServ
              .sweetAlertSucess("User Deleted", "Deletion Successful")
              .then(res => this.route.navigate(["/usersInsight"]));
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
