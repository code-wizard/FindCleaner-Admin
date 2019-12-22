import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs";

import { Injectable, OnInit } from "@angular/core";
import { EndpointsService } from "../services/config/endpoints.service";

@Injectable()
export class AuthcrudInterceptorService implements HttpInterceptor, OnInit {
  constructor(private endpoints: EndpointsService) {}

  ngOnInit() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { httpStatus } = this.endpoints;
    if (httpStatus === "allCalls") {
      req = req.clone({
        setHeaders: {
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return next.handle(req);
  }
}
