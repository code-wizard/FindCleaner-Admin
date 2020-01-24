import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EndpointsService } from "src/app/services/config/endpoints.service";

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
  dataSource = [];
  pageNumber = 1;
  wholeListView = true;
  clickedId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enpoints: EndpointsService
  ) {}

  ngOnInit() {
    this.getUsersWithRatings();
    this.setActiveClassByUrl();
  }

  private setActiveClassByUrl(userId?) {
    if (!userId) {
      const url = window.location.href;
      const indexOfId = url.lastIndexOf("/");
      const id = url.substring(indexOfId + 1);
      this.clickedId = id;
      return;
    }
    this.clickedId = userId;
  }

  private getUsersWithRatings() {
    const apiUrl = `${this.enpoints.ratingUrl.fetchUsersWithRatings}`;
    this.enpoints.fetch(apiUrl).subscribe(res => {
      // console.log(res, " raitng");
      this.setDataSource(res);
    });
  }

  private setDataSource(res) {
    const { results, next, previous, count } = res;
    this.totalItemCount = count;
    // set pagination next, previous and page counts values
    this.paginationUrl = { ...this.paginationUrl, next, previous };
    // check if page is the lastnext, then set page count to total item count
    this.paginationUrl.next !== null
      ? this.paginationUrl
      : (this.paginationUrl.viewCountEnd = this.totalItemCount);
    // check if page is the lastprevious, then set page count to perPage count[10]
    this.paginationUrl.previous !== null
      ? this.paginationUrl
      : (this.paginationUrl.viewCountEnd = 10);
    // check if page is the single, then set page count to perPage count[count]
    count > this.paginationUrl.viewCountEnd
      ? this.paginationUrl
      : (this.paginationUrl.viewCountEnd = count);
    this.dataSourceUsersWithRatings = results;
  }

  applyFilter(filterValue: string) {
    if (filterValue !== "all") {
      this.enpoints
        .fetchFilteredRatings(filterValue.trim().toLowerCase())
        .subscribe(res => {
          // console.log(res, "filted res");
          this.setDataSource(res);
        });
    } else {
      this.getUsersWithRatings();
      this.setActiveClassByUrl();
    }
  }

  handleViewRatingList(userId) {
    this.router.navigate(["/ratingsInsight/pages/1/search?/", userId]);
    this.setActiveClassByUrl(userId);
  }
}
