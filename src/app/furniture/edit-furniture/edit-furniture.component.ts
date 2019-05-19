import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FurnitureModel } from '../models/furniture.model';
import { FurnitureService } from '../furniture.service';

@Component({
  selector: 'app-edit-furniture',
  templateUrl: './edit-furniture.component.html',
  styleUrls: ['./edit-furniture.component.styl']
})
export class EditFurnitureComponent implements OnInit {

  bindingModel: FurnitureModel;
  id: string;
  errMessage: string;

  constructor(private furnitureService: FurnitureService, 
    private route: ActivatedRoute,
    private router: Router) { 
    this.id = this.route.params['value']['id'];
  }

  ngOnInit() {
    this.furnitureService.getFurnitureDetails(this.id)
    .subscribe(data =>{
      this.bindingModel = data;
    },
    err => {
      this.errMessage = err;
    })
  }

  edit(){
    let body = {
      '_id': this.bindingModel.id,
      'make': this.bindingModel.make,
      'model': this.bindingModel.model,
      'year': this.bindingModel.year,
      'image': this.bindingModel.image,
      'description': this.bindingModel.description,
      'price': this.bindingModel.price,
      'material': this.bindingModel.material,
    }

    this.furnitureService.editFurniture(body, this.id)
    .subscribe(data =>{
      this.router.navigate(['furniture/all'])
    }, err => {
      console.log(err)
    })

    this.furnitureService.editCart(body, this.id)
    .subscribe(data =>{
      this.router.navigate(['furniture/all'])
    }, err => {
      console.log(err)
    })
  
  }

}
