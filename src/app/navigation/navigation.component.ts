import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.styl']
})
export class NavigationComponent implements OnInit {

  @Input() 
  userName: string;

  constructor(private authService: AuthService,  private router: Router) { 
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logout().subscribe(data => {
      localStorage.clear();
      // localStorage.setItem("username","")
      // localStorage.setItem('userId', "");
      // localStorage.setItem("token","")
      this.authService.authtoken = "";
      this.router.navigate(['/login'])
    })
  }

}
