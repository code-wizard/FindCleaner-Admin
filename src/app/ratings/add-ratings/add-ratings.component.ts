import { Component, OnInit } from "@angular/core";
import { EndpointsService } from "src/app/services/config/endpoints.service";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-add-ratings",
  templateUrl: "./add-ratings.component.html",
  styleUrls: ["./add-ratings.component.css"]
})
export class AddRatingsComponent implements OnInit {
  ratingDetails = {
    user: "",
    service_request: "",
    review: "",
    rating_score: ""
  };

  services = [];
  providers = [];

  constructor(
    private endpoints: EndpointsService,
    private genServ: GeneralService
  ) {}

  private getProviders() {
    this.endpoints.fetchFilteredUsers("provider").subscribe((res: any) => {
      // console.log(res, "providers");
      this.providers.push(...res.results);
    });
  }

  private getAllServices() {
    const apiUrl = this.endpoints.serviceUrl.getAllServices;
    this.endpoints.fetch(`${apiUrl}`).subscribe((res: any) => {
      this.services.push(...res);
      // console.log(res, "getAllServices");
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

  ngOnInit() {
    this.getProviders();
    this.getAllServices();
  }

  handleRatingCreation() {
    const validRatingDetails = this.validRatingDetails;
    if (typeof validRatingDetails === "string") {
      this.genServ.sweetAlertHTML("Validation", validRatingDetails);
    } else {
      console.log(validRatingDetails, "dataSending");
      this.genServ.sweetAlertCreate("Ratings").then(response => {
        if (response.value) {
          const apiUrl = this.endpoints.ratingUrl.createRating;
          this.endpoints.create(apiUrl, validRatingDetails).subscribe(
            res => {
              console.log(res);
              this.genServ.sweetAlertSucess(
                "Rating Created",
                "Created Successful"
              );
            },
            error => {
              console.log(error, "error on create rating");
              this.genServ.sweetAlertError(
                "Sorry, Rating creation Not Successful"
              );
            }
          );
        }
      });
    }
  }
}
