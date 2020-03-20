import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "src/app/core/services/https/http.service";
import { ApiMethod } from "src/app/core/services/const";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  @Input() users: any;
  userData: any;
  viewUserData: boolean = false;
  constructor(private http: HttpService) {}
  viewUser(login) {
    this.http.requestCall(`users/${login}`, ApiMethod.GET).subscribe(data => {
      this.userData = data;
      this.viewUserData = true;
    });
  }
  back() {
    this.viewUserData = false;
  }

  ngOnInit() {}
}
