import { Component, OnInit } from "@angular/core";

import { HttpService } from "src/app/core/services/https/http.service";
import { Endpoints, ApiMethod } from "src/app/core/services/const";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  searchParam: string;
  searchResult: any = [];
  showSearchResult: boolean = false;
  constructor(private http: HttpService) {}
  searchGithub(searchParam) {
    if (searchParam != undefined) {
      this.http
        .requestCall(`search/users?q=${searchParam}`, ApiMethod.GET)
        .subscribe(arg => {
          this.searchResult = arg.items;
          this.showSearchResult = true;
          console.log(this.searchResult);
        });
    }
  }

  ngOnInit() {}
}
