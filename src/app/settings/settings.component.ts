import { Component, OnInit } from "@angular/core";
import { EndpointsService } from "../services/config/endpoints.service";
import { GeneralService } from "../services/general.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  settingsDetails = {};
  constructor(
    private endpoints: EndpointsService,
    private genServ: GeneralService
  ) {}

  private getSettings(settings?) {
    if (!settings) {
      this.endpoints.fetchSettings().subscribe(res => {
        delete res["id"];
        delete res["created_at"];
        delete res["updated_at"];
        this.settingsDetails = res;
      });
    } else {
      delete settings["id"];
      delete settings["created_at"];
      delete settings["updated_at"];
      this.settingsDetails = settings;
    }
  }

  private get updatedSettingsDetails() {
    let validationFields = "";
    const obj = this.settingsDetails;

    for (const key in obj) {
      if (!obj[key]) {
        validationFields += `${key} cannot be blank <br/>`;
      }
    }
    return !validationFields ? { ...this.settingsDetails } : validationFields;
  }

  ngOnInit() {
    this.getSettings();
  }

  handleUpdate() {
    const updatedSettingsDetails = this.updatedSettingsDetails;
    if (typeof updatedSettingsDetails === "string") {
      this.genServ.sweetAlertHTML("Validation", updatedSettingsDetails);
    } else {
      this.genServ.sweetAlertUpdates("Settings").then(response => {
        if (response.value) {
          this.endpoints.updateSettings(updatedSettingsDetails).subscribe(
            res => {
              this.getSettings(res);
              this.genServ.sweetAlertSucess(
                "Settings Updated",
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
}
