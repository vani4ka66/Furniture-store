import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http'
import { AuthService } from '../authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


const appKey = "kid_HJM5wAs0Q";
const appSecret = "11635c09dad14a04a4eddbc0acfe179c";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService, private toastr: ToastrService, private router: Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{

        if(request.url.endsWith('login') || request.url.endsWith('appKey')){
            request = request.clone({
                setHeaders: {
                    'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                    'Content-Type': 'application/json'
                }
            })
        } else{
            request = request.clone({
                setHeaders: {
                    'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                    'Content-Type': 'application/json'
                }
            })
        }
        
        return next.handle(request)
        .pipe(tap((event: any) => {
            if(event instanceof HttpResponse && request.url.endsWith('login')){
                this.successfulLogin(event['body'])
                // console.log(event instanceof HttpResponse)
                // console.log(event.url)
                // console.log(event.body)
            }

            if(event instanceof HttpResponse && request.url.endsWith('create')) {
                this.router.navigate(['/furniture/all'])
            }

        }, (err: any) => {
            if(err instanceof HttpErrorResponse){
                switch(err.status){
                    case 401: 
                    this.router.navigate(['/login'])
                    break;
                    case 404: 
                    this.router.navigate(['/not-found'])
                    break;
                    case 500: 
                    this.router.navigate(['/server-error'])
                    break;
                }
            }
        }));
    }

    private successfulLogin(data){
        this.authService.authtoken = data['_kmd']['authtoken'];
        localStorage.setItem('authtoken', data['_kmd']['authtoken']);
        localStorage.setItem('username', data['username']);
        this.router.navigate(['/home']);
      }
}