import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, throwError } from "rxjs";
import { ApiMethod, Endpoints } from "src/app/core/services/const";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  requestCall(api, method: ApiMethod, data?: any) {
    let response;
    switch (method) {
      case ApiMethod.GET:
        response = this.http.get(`${environment.baseUrl}${api}`);
        break;
      case ApiMethod.POST:
        response = this.http.post(`${environment.baseUrl}${api}`, data);
        break;
      case ApiMethod.PUT:
        response = this.http.put(`${environment.baseUrl}${api}`, data);
        break;
      case ApiMethod.DELETE:
        response = this.http.delete(`${environment.baseUrl}${api}`);
        break;
      default:
        break;
    }
    return response;
  }
}
