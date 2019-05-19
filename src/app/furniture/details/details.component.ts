import { Component, OnInit } from '@angular/core';
import { FurnitureModel } from '../models/furniture.model';
import { ActivatedRoute } from '@angular/router';
import { FurnitureService } from '../furniture.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.styl']
})
export class DetailsComponent implements OnInit {

  furniture: FurnitureModel;
  id: string;

  constructor(private route: ActivatedRoute, private furnitureService: FurnitureService) {
    this.id = this.route.params['value']['id'];
  }

  ngOnInit() {
    this.furnitureService.getFurnitureDetails(this.id).subscribe(data=>{
      this.furniture = data;
    });
   
  }

}
