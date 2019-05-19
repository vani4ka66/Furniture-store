import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { CreateFurnitureModel } from './models/create-furniture.model';
import { FurnitureModel } from './models/furniture.model';
import { map } from 'rxjs/operators';
import { CartModel } from './models/cart.model';

const appKey = "kid_HJM5wAs0Q";
const appSecret = "11635c09dad14a04a4eddbc0acfe179c";
const createUrl = `https://baas.kinvey.com/appdata/${appKey}/furnitures`;
const allUrl = `https://baas.kinvey.com/appdata/${appKey}/furnitures`;
const mineUrl = `https://baas.kinvey.com/appdata/${appKey}/furnitures/`;
const detailsUrl = `https://baas.kinvey.com/appdata/${appKey}/furnitures/`;
const deleteUrl = `https://baas.kinvey.com/appdata/${appKey}/furnitures/`;
const editUrl = `https://baas.kinvey.com/appdata/${appKey}/furnitures/`;
const editCartUrl = `https://baas.kinvey.com/appdata/${appKey}/myCart/`;
const userId = localStorage.getItem('userId');
const myCartUrl = `https://baas.kinvey.com/appdata/${appKey}/myCarts/`;


@Injectable({
    providedIn: 'root'
})
export class FurnitureService{

    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}

    constructor(private http: HttpClient){}


    private createAuthHeaders(type: string) : HttpHeaders{
        if(type ==='Basic'){
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            })
        } else{
            return new HttpHeaders({
                'Authorization': `Kinvey ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            })
        }
    }

    createFurniture(body: CreateFurnitureModel){
        return this.http.post(createUrl, body, 
             {headers: this.createAuthHeaders('Kinvey')});
    }

    createCart(body: CartModel){
        // let arr = this.getAllFurniture();
        // if(arr.pipe(map(x => x.filter(a => a.id == body['_id'])))){
            
        // }
        return this.http.post(myCartUrl, body, 
             {headers: this.createAuthHeaders('Kinvey')});
    }

    viewMyCart(){
        return this.http.get<FurnitureModel[]>(myCartUrl,  
            {headers: this.createAuthHeaders('Kinvey')})
            .pipe(map(x=> x.filter(a => a['_acl']['creator'] == localStorage.getItem('userId'))))

    }

    getAllFurniture(){
        return this.http.get<FurnitureModel[]>(allUrl, 
             {headers: this.createAuthHeaders('Kinvey')})
        .pipe(map(x=> x.sort((a, b) => a.make > b.make ? 1: -1)))
    }

    getFurnitureDetails(id: string){
        return this.http.get<FurnitureModel>(detailsUrl + id, 
            {headers: this.createAuthHeaders('Kinvey')})
    }

    getMyFurniture(){
        return this.http.get<FurnitureModel[]>(mineUrl, 
            {headers: this.createAuthHeaders('Kinvey')})
         .pipe(map(x=> x.filter(a => a['_acl']['creator'] == localStorage.getItem('userId'))))
         .pipe(map(x=> x.sort((a, b) => a.make > b.make ? 1: -1)))
    }

    editFurniture(body, id: string){
        console.log(body)
        return this.http.put<FurnitureModel>(editUrl + id, body, 
            {headers: this.createAuthHeaders('Kinvey')});
    }

    editCart(body, id: string){
        console.log(body)
        return this.http.put<FurnitureModel>(editCartUrl + id, body, 
            {headers: this.createAuthHeaders('Kinvey')});
    }

    deleteFurniture(id: string){
        return this.http.delete<FurnitureModel>(deleteUrl + id, 
            {headers: this.createAuthHeaders('Kinvey')})
    }

    deleteFromCart(id: string){
        return this.http.delete<FurnitureModel>(myCartUrl + id, 
            {headers: this.createAuthHeaders('Kinvey')})
    }

    

}