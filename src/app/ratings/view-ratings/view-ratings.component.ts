import { Component, OnInit } from "@angular/core";
import { EndpointsService } from "src/app/services/config/endpoints.service";
import { GeneralService } from "src/app/services/general.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-ratings",
  templateUrl: "./view-ratings.component.html",
  styleUrls: ["./view-ratings.component.css"]
})
export class ViewRatingsComponent implements OnInit {
  ratingDetails = {
    user: "",
    service_request: "",
    review: "",
    rating_score: ""
  };

  ratingId;

  constructor(
    private endpoints: EndpointsService,
    private genServ: GeneralService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(res => {
      const { ratingId } = res;
      this.ratingId = "2";
      console.log(ratingId, "dsj");
      const apiUrl = `${this.endpoints.ratingUrl.getUpdateDeleteRating}/${ratingId}`;
      this.endpoints.fetch(apiUrl).subscribe(res => {
        console.log(res, "onfetch of each arating");
        // this.ratingDetails = { ...res };
      });
    });
  }

  private get validRatingDetails(): any {
    let validationFields = "";
    const obj = this.ratingDetails;
    let validData = {};

    for (const key in obj) {
      if (!obj[key]) {
        validationFields += `${key} cannot be blank <br/>`;
      } else {
        if (
          key === "user" ||
          key === "service_request" ||
          key === "rating_score"
        ) {
          validData[key] = Number(obj[key]);
        } else {
          validData[key] = obj[key];
        }
      }
    }
    return !validationFields ? { ...validData } : validationFields;
  }

  ngOnInit() {}

  handleRatingUpdate() {
    const validRatingDetails = this.validRatingDetails;
    if (typeof validRatingDetails === "string") {
      this.genServ.sweetAlertHTML("Validation", validRatingDetails);
    } else {
      console.log(validRatingDetails, "dataSending");
      this.genServ.sweetAlertUpdates("Ratings").then(response => {
        if (response.value) {
          const apiUrl = `${this.endpoints.ratingUrl.getUpdateDeleteRating}/${this.ratingId}`;
          this.endpoints.update(apiUrl, validRatingDetails).subscribe(
            res => {
              console.log(res);
              this.genServ.sweetAlertSucess(
                "Rating Update",
                "Update Successful"
              );
            },
            error => {
              console.log(error, "error on update rating");
              this.genServ.sweetAlertError(
                "Sorry, Rating update Not Successful"
              );
            }
          );
        }
      });
    }
  }

  handleRatingDelete() {
    this.genServ.sweetAlertDeletions("Rating").then(res => {
      if (res.value) {
        const apiUrl = `${this.endpoints.ratingUrl.getUpdateDeleteRating}`;
        this.endpoints.delete(apiUrl, this.ratingId).subscribe(
          res => {
            console.log(res);
            this.genServ.sweetAlertSucess(
              "Rating Deleted",
              "Deletion Successful"
            );
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
