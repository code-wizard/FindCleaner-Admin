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
  totalItemCount = 0;
  paginationUrl = {
    next: "",
    prev: "",
    viewCountStart: 1,
    viewCountEnd: 10
  };
  pageNumber = 1;
  wholeListView = true;
  userId;

  constructor(
    private route: ActivatedRoute,
    private list: ListRatingsComponent,
    private endpoints: EndpointsService,
    private genServ: GeneralService,
    private router: Router
  ) {
    this.route.params.subscribe(res => {
      const { userId } = res;
      this.userId = userId;
      this.getUsersWithRatings(userId);
      this.list.wholeListView = false;
    });
  }

  private getUsersWithRatings(userId) {
    const apiUrl = `${this.endpoints.ratingUrl.fetchRatingByUser}/${userId}`;
    this.endpoints.fetch(apiUrl).subscribe(res => {
      // console.log(res, " allrating for user");
      this.setDataSource(res);
    });
  }

  private setDataSource(res) {
    const responseWithRatingArr = res.map((element, i) => {
      let ratingArr = Array(Number(element.rating_score))
        .fill(0)
        .map((x, i) => i);
      return { ...res[i], ratingArr };
    });
    this.dataSourceRatingServices = responseWithRatingArr;
  }

  ngOnInit() {}

  handleRatingView(id) {
    this.router.navigate([
      `/ratingsInsight/pages/1/search?/${this.userId}/viewRatings/`,
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
            this.router.navigate([`/ratingsInsight/pages/1/`]);
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
