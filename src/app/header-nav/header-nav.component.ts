import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { LocalStorageService } from "../utils/localStorage.service";

@Component({
  selector: "app-header-nav",
  templateUrl: "./header-nav.component.html",
  styleUrls: ["./header-nav.component.css"]
})
export class HeaderNavComponent implements OnInit {
  userDetails = {};
  constructor(
    private authServ: AuthService,
    private localstorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.userDetails = JSON.parse(
      this.localstorage.getFromLocalStorage("AdminUserInfo")
    );
  }

  handlelogout() {
    this.authServ.logout();
  }
}
