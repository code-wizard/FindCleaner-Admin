import { Component, OnInit } from "@angular/core";
import { EndpointsService } from "../services/config/endpoints.service";
import { GeneralService } from "../services/general.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  serviceDetails = {
    service_category: "",
    service: "",
    avatar: new FormData(),
    agency_base_price: "",
    individual_base_price: ""
  };
  constructor(
    private endpoints: EndpointsService,
    private genServ: GeneralService
  ) {}

  private get getserviceDetails() {
    let validationFields = "";
    const obj = this.serviceDetails;

    for (const key in obj) {
      if (!obj[key] && key !== "avatar") {
        validationFields += `${key} cannot be blank <br/>`;
      }
    }
    return !validationFields ? { ...this.serviceDetails } : validationFields;
  }

  ngOnInit() {}

  handleFileInput(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.serviceDetails.avatar.append("image", image);
    }
  }

  handleServiceCreation() {
    this.endpoints.httpStatus = "service";
    const serviceDetails = this.getserviceDetails;
    console.log(serviceDetails, "detauls");
    if (typeof serviceDetails === "string") {
      this.genServ.sweetAlertHTML("Validation", serviceDetails);
    } else {
      this.genServ.sweetAlertCreate("New Service").then(response => {
        if (response.value) {
          const apiUrl = this.endpoints.serviceUrl.createService;
          this.endpoints.create(apiUrl, serviceDetails).subscribe(
            res => {
              this.genServ
                .sweetAlertSucess("Service Created", "Creation Successful")
                .then(res => {
                  this.serviceDetails = {
                    service_category: "",
                    service: "",
                    avatar: new FormData(),
                    agency_base_price: "",
                    individual_base_price: ""
                  };
                  this.endpoints.httpStatus = "allCalls";
                });
            },
            error => {
              console.log(error, "error on servicecreate");
              this.genServ.sweetAlertError(
                "Sorry, Service Creation Not Successful"
              );
            }
          );
        }
      });
    }
  }
}
