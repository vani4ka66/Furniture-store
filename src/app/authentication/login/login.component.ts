import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  model: LoginModel;
  loginFailed: boolean;
  errMessage: string;

  constructor(private authService: AuthService, private router: Router) { 
    this.model = new LoginModel('', '');
  }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model)
    .subscribe(data => {
      this.saveToken(data);
      this.loginFailed = false;
      this.router.navigate(['furniture/all'])
    }, err => {
      this.loginFailed = true;
      this.errMessage = err.message;
      console.log(err.message)
    })
  }

  private saveToken(data){
    // localStorage.setItem('currentUser', JSON.stringify({
    //     "username": data.username,
    //     "token": data['_kmd']['authtoken']
    // }))

    localStorage.setItem("username",data.username)
    localStorage.setItem('userId', data._id);
    localStorage.setItem("token",data['_kmd']['authtoken'])
    
    
}

}
