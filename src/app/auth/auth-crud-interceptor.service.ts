import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs";

import { Injectable, OnInit } from "@angular/core";
import { EndpointsService } from "../services/config/endpoints.service";
import { LocalStorageService } from "../utils/localStorage.service";

@Injectable()
export class AuthcrudInterceptorService implements HttpInterceptor, OnInit {
  constructor(
    private endpoints: EndpointsService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { httpStatus } = this.endpoints;
    const token = JSON.parse(this.localStorage.getFromLocalStorage("token"));
    if (httpStatus === "allCalls") {
      req = req.clone({
        setHeaders: {
          Authorization: `jwt ${token}`,
          "Access-Control-Allow-Origin": "*"
          // "Content-Type": "application/json"
        }
      });
    } else if (httpStatus === "login") {
      req = req.clone({
        setHeaders: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    }

    return next.handle(req);
  }
}
