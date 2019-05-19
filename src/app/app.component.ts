import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChildActivationEnd } from '@angular/router';
import { MyCartComponent } from './furniture/my-cart/my-cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements AfterViewInit{
  title = 'forms-exams';
  userName: string = "";

  @ViewChild(MyCartComponent) child;

  message: string;

  ngOnInit() {
    this.userName = localStorage.getItem('username')
    // this.message = this.child.message
  }

  ngAfterViewInit() {
    this.message = this.child.message;
  }


}


