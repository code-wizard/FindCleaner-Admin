import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ListRatingsComponent } from "../list-ratings/list-ratings.component";
import { EndpointsService } from "src/app/services/config/endpoints.service";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-list-servicesrated",
  templateUrl: "./list-servicesrated.component.html",
  styleUrls: ["./list-servicesrated.component.css"]
})
export class ListServicesratedComponent implements OnInit {
  dataSourceRatingServices = [];

  constructor(
    private route: ActivatedRoute,
    private list: ListRatingsComponent,
    private endpoints: EndpointsService,
    private genServ: GeneralService,
    private router: Router
  ) {
    this.route.params.subscribe(res => {
      this.list.wholeListView = false;
    });
  }

  ngOnInit() {}

  handleRatingView(id) {
    this.router.navigate([
      "/ratingsInsight/pages/1/search?/1/viewRatings/",
      id
    ]);
  }

  handleRatingDelete(id) {
    this.genServ.sweetAlertDeletions("Rating").then(res => {
      if (res.value) {
        const apiUrl = `${this.endpoints.ratingUrl.getUpdateDeleteRating}`;
        this.endpoints.delete(apiUrl, id).subscribe(
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
