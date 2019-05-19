import {
    HttpResponse,
    HttpRequest,
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpErrorResponse
    } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

    @Injectable()
    export class ErrorInterceptor implements HttpInterceptor{

        constructor(private toastr: ToastrService, private router: Router){

        }
        intercept(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {
            
            return next.handle(req)
            .pipe(catchError( (err: HttpErrorResponse) => {
                switch(err.status){
                    case 401: 
                    this.toastr.error("Warnings!");
                    break;
                    case 400:
                    const message = Object.keys(err.error.errors)
                    .map(x => err.error.errors[x])
                    .join('\n');

                    this.toastr.error(message, "Warningssss!")
                    break;
                }
                return throwError(err);
            }));
        }

    }