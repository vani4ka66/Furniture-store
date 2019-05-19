import { Component, OnInit, Input } from '@angular/core';
import { FurnitureModel } from '../models/furniture.model';
import { FurnitureService } from '../furniture.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
// import { AllFurnitureComponent } from '../all-furniture/all-furniture.component';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.styl']
})
export class MyCartComponent implements OnInit {

  bindingModel: FurnitureModel[];
  message = "vvvvvv"
  originalBindingModel: FurnitureModel[];
  errMessage: string;
  totalSum: number = 0;
  map: Array<any> = [];

  constructor(private furnitureService: FurnitureService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.furnitureService.viewMyCart()
    .subscribe(data =>{
      this.bindingModel = data.filter(x=> x['userId'] == localStorage.getItem('userId'));
      this.originalBindingModel = data.filter(x=> x['userId'] == localStorage.getItem('userId'))
   
      for(let i = 0; i < this.originalBindingModel.length; i++){
          this.map.push(this.originalBindingModel[i]['arr']['make'], 1)
      }

      
      
      // console.log(this.map.values)
      // for(let i in this.map.values){
      //   console.log(i)
      // }
      console.log(this.map.filter(x => x == "green sofa").length);

      this.bindingModel.forEach((a)=>{
        this.totalSum += a['arr']['price'];
      })
    },
    err => {
      this.errMessage = err;
    })
  }

  searchItem(make: string, furniture, originalFurniture, ){
    this.bindingModel = this.originalBindingModel
    .filter(a => a.make.toLowerCase().indexOf(make) != -1);
  }

  deleteItem(id: string){
    this.furnitureService.deleteFromCart(id)
    .subscribe(() => {
       this.router.navigate(['/furniture/all'])
    }),
    err =>{
      this.errMessage = err;

    }
  }


}
