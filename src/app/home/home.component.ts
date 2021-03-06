import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  username: string;
  constructor() { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('curremtUser'));
    if(currentUser){
      this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    }
  }

}
