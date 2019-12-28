import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { LocalStorageService } from "./utils/localStorage.service";
import { GeneralService } from "./services/general.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "FindCleaner-Admin";
  settingsURL = false;
  loginRegisterUrl = false;

  constructor(
    location: Location,
    router: Router,
    private localStorage: LocalStorageService,
    private genServ: GeneralService
  ) {
    const loggedIn = JSON.parse(this.localStorage.getFromLocalStorage("token"));
    // console.log(loggedIn, "log", !this.loginRegisterUrl && !loggedIn);

    router.events.subscribe(val => {
      this.settingsURL = location.path().includes("/settings") ? true : false;
      this.loginRegisterUrl =
        location.path().includes("/login") ||
        location.path().includes("/register")
          ? true
          : false;
      // if (!this.loginRegisterUrl && !loggedIn) {
      //   this.genServ.sweetAlertAuthVerification();
      // }
    });
  }
}
