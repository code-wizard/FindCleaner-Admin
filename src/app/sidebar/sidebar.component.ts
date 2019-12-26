import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Subject } from "rxjs";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  url = new Subject();
  constructor(location: Location, router: Router) {
    router.events.subscribe(val => {
      this.url.next(window.location.href);
      // console.log(location.path(), "url");
    });
  }
  ngOnInit() {}
}
