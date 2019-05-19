import { Injectable} from '@angular/core' 
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';



const appKey = "kid_HJM5wAs0Q";
const appSecret = "11635c09dad14a04a4eddbc0acfe179c";
const registerUrl = `https://baas.kinvey.com/user/${appKey}`
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`

@Injectable()
export class AuthService{

    public currentAuthtoken: string;

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
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin:' : 'http://localhost:4200'
            })
        }
    }

    login(loginModel: LoginModel){
        return this.http.post(loginUrl, JSON.stringify(loginModel),
        {headers: this.createAuthHeaders('Basic')});
    }

    register(model: RegisterModel){
        return this.http.post(registerUrl, 
            JSON.stringify(model), 
            {headers: this.createAuthHeaders('Basic')});
    }

    logout(){
        localStorage.clear();
        localStorage.setItem("username","")
        localStorage.setItem('userId', "");
        localStorage.setItem("token","")
        return this.http.post(logoutUrl, {}, {headers: this.createAuthHeaders('Kinvey')});
    }

    checkIfLoggedIn(){
        if(localStorage.getItem('token')){
            return true;
        }
        return false;
    }

    get authtoken(){
        return localStorage.getItem('token');
    }

    set authtoken(value: string){
        this.currentAuthtoken = value;
    }
}