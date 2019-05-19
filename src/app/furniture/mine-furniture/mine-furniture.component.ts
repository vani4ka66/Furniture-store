import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { Observable } from 'rxjs'
import { FurnitureModel } from '../models/furniture.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mine-furniture',
  templateUrl: './mine-furniture.component.html',
  styleUrls: ['./mine-furniture.component.styl']
})
export class MineFurnitureComponent implements OnInit {

  furnitures: FurnitureModel[]
  constructor(private furnitureService: FurnitureService, private router: Router) { }

  ngOnInit() {
   this.furnitureService.getMyFurniture().subscribe(data => {
     this.furnitures = data;
   });
  }

  deleteItem(id: string){
    this.furnitureService.deleteFurniture(id)
    .subscribe(() => {
      this.router.navigate(['/furniture/all'])
    });
  }

}
