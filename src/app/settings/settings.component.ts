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
    avatar: null,
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

  handleServiceCreation() {
    const serviceDetails = this.getserviceDetails;
    if (typeof serviceDetails === "string") {
      this.genServ.sweetAlertHTML("Validation", serviceDetails);
    } else {
      this.genServ.sweetAlertCreate("New Service").then(response => {
        if (response.value) {
          const apiUrl = this.endpoints.serviceUrl.creatService;
          this.endpoints.register(apiUrl, serviceDetails).subscribe(
            res => {
              this.genServ
                .sweetAlertSucess("Service Created", "Creation Successful")
                .then(
                  res =>
                    (this.serviceDetails = {
                      service_category: "",
                      service: "",
                      avatar: null,
                      agency_base_price: "",
                      individual_base_price: ""
                    })
                );
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
