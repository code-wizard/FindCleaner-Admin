import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-list-ratings",
  templateUrl: "./list-ratings.component.html",
  styleUrls: ["./list-ratings.component.css"]
})
export class ListRatingsComponent implements OnInit {
  dataSourceUsersWithRatings = [];

  totalItemCount = 0;
  paginationUrl = {
    next: "",
    previous: "",
    viewCountStart: 1,
    viewCountEnd: 10
  };
  pageNumber = 1;
  wholeListView = true;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  handleViewRatingList() {
    // this.wholeListView = false;
    this.router.navigate(["/ratingsInsight/pages/1/search?/1"]);
  }

  loadProviderServiceRatings() {}
}
