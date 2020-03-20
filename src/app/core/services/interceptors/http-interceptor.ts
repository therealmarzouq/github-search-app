import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
// import { NgxUiLoaderService } from "ngx-ui-loader";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  status = "ONLINE";
  isConnected = true;
  constructor(public router: Router) // private ngxService: NgxUiLoaderService,
  // private util: UtilService,
  {
    // this.connectionService.monitor().subscribe(isConnected => {
    //     this.isConnected = isConnected;
    //     if (this.isConnected) {
    //       this.status = "ONLINE";
    //       console.log(this.status);
    //     }
    //     else {
    //       this.status = "OFFLINE";
    //       console.log(this.status);
    //     }
    //   })
  }
  getToken() {
    return localStorage.getItem("token");
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers: any;
    headers = { Authorization: "", "Content-Type": "application/json" };
    headers["Authorization"] = "Bearer " + this.getToken();

    headers = { Authorization: "", "Content-Type": "application/json" };
    headers["Authorization"] = "Bearer " + this.getToken();

    request = request.clone({
      url: environment.baseUrl + request.url,
      setHeaders: headers
    });

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          // console.log('this is the interceptor!!!!!');

          if (
            request.url.indexOf("public/products") === -1 &&
            request.url.indexOf("public/articles/featured") === -1
          ) {
            // this.ngxService.start();
          }

          if (event instanceof HttpResponse) {
            // do stuff with response if you want
            // this.ngxService.stop();
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
            console.log(err.status);
            // this.ngxService.stop();
            if (err.status === 401) {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              this.router.navigate(["/login"]);
              console.log("this is a 401 error");
            } else if (err.status === 0) {
              console.log("Server is not available at the moment");
              // this.util.showErrorToast("Server is not available at the moment Please try again");
            }
          }
        }
      )
    );
    // .catch((error,caught)=>{
    //     return Observable.throw(error.error);
    // });
  }
}
