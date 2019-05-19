import {
HttpResponse,
HttpRequest,
HttpEvent,
HttpInterceptor,
HttpHandler
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private toastr: ToastrService, private router: Router){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{

        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        request = request.clone({
            setHeaders: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        })
        return next.handle(request)
        .pipe(tap((res: any) => {
            if(res instanceof HttpResponse && res.body.token){
                this.saveToken(res.body);
                this.toastr.success(res.body.message, "Success!");
                this.router.navigate(['/furniture/all'])
            }

            if(res instanceof HttpResponse && res.body.success && res.url.endsWith('register')){
                this.toastr.success(res.body.message, "Success!");
                this.router.navigate(['/login']);
            }

            if(res instanceof HttpResponse && res.body.success && res.url.endsWith('create')){
                this.toastr.success(res.body.message, "Success!");
                this.router.navigate(['/furniture/all']);
            }
        }));
    }

    private saveToken(data){
        localStorage.setItem('currentUser', JSON.stringify({
            "username": data.user.username,
            "token": data.token
        }))
    }
}