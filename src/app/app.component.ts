import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "FindCleaner-Admin";
  settingsURL = false;
  loginRegisterUrl = false;

  constructor(location: Location, router: Router) {
    router.events.subscribe(val => {
      this.settingsURL = location.path().includes("/settings") ? true : false;
      this.loginRegisterUrl =
        location.path().includes("/login") ||
        location.path().includes("/register")
          ? true
          : false;
    });
  }
}
