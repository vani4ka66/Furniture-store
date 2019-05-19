import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './authentication/auth.service';
import { AuthGuard } from './auth.guard';
import { AnimationsComponent } from './animations/animations.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr'
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { CreateFurnitureComponent } from './furniture/create-furniture/create-furniture.component';
import { DetailsComponent } from './furniture/details/details.component';
import { MineFurnitureComponent } from './furniture/mine-furniture/mine-furniture.component';
import { AllFurnitureComponent } from './furniture/all-furniture/all-furniture.component';
import { CustomFormsModule } from 'ng2-validation' //for validation for min/max/range
import { EditFurnitureComponent } from './furniture/edit-furniture/edit-furniture.component';
import { MyCartComponent } from './furniture/my-cart/my-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AnimationsComponent,
    CreateFurnitureComponent,
    DetailsComponent,
    MineFurnitureComponent,
    AllFurnitureComponent,
    EditFurnitureComponent,
    MyCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: HomeComponent, canActivate: [ AuthGuard ]},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'animation', component: AnimationsComponent},
      {path: 'furniture/create', component: CreateFurnitureComponent},
      // {path: 'furniture', component: CreateFurnitureComponent,
      //   children: [
      //     {path: 'create', component: CreateFurnitureComponent}
      //   ], pathMatch: 'full'},
      {path: 'furniture/details/:id', component: DetailsComponent},
      {path: 'furniture/mine', component: MineFurnitureComponent},
      {path: 'furniture/all', component: AllFurnitureComponent},
      {path: 'furniture/edit/:id', component: EditFurnitureComponent},
      {path: 'furniture/cart', component: MyCartComponent}
    ])
  ],
  providers: [AuthService, AuthGuard, 
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: TokenInterceptor,
  //   multi: true
  // },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: JwtInterceptor,
  //   multi: true
  // },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
