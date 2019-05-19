import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
// import { Observable } from 'rxjs'
import { FurnitureModel } from '../models/furniture.model';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { map, filter } from 'rxjs/operators';
import { CartModel } from '../models/cart.model';


@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.styl']
})
export class AllFurnitureComponent implements OnInit {

  furniture: FurnitureModel[];
  originalFurniture: FurnitureModel[];
  myCart: FurnitureModel[] = [];
  isNameAsc = true;
  userId : string = localStorage.getItem('userId')
 

  constructor(private furnitureService: FurnitureService,
    private router: Router) { 
      
    }

  ngOnInit() {
    this.furnitureService.getAllFurniture().subscribe(data => {
      this.furniture = data;
      this.originalFurniture = data;
    });
  }

  searchItem(make: string){
    this.furniture = this.originalFurniture
    .filter(a => a.make.toLowerCase().indexOf(make) != -1);
  }

  sortByName(){
    if(this.isNameAsc){
      this.furniture
      .sort((a, b) => b.make > a.make ? 1: -1);
      this.isNameAsc = false;
    }
    else{
      this.furniture
      .sort((a, b) => a.make > b.make ? 1: -1);
      this.isNameAsc = true;
    }
  }

  sortByPriceAsc(){
    this.furniture
    .sort((a, b) => b.make > a.make ? 1: -1);

    this.furniture
    .sort((a, b) => a.price > b.price ? 1: -1);
  }

  sortByPriceDesc(){
    this.furniture
    .sort((a, b) => b.make > a.make ? 1: -1);
    
    this.furniture
    .sort((a, b) => b.price > a.price ? 1: -1);
}


  addToCart(f: FurnitureModel){
    let furnitureModel = {
      userId: this.userId,
      arr: f
    }
    this.furnitureService.createCart(furnitureModel)
    .subscribe((data) => {
      // console.log('vvv ' + data['arr']['make'])
      this.router.navigate(['/furniture/cart'])
  })

  
    
  }
}

  


