import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { CourseCartListComponent } from './course-cart-list/course-cart-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { MessagesComponent } from './messages/messages.component';
import {LoadingService} from "./loading/loading.service";
import {MessagesService} from "./messages/messages.service";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    CourseCartListComponent,
    LoadingComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoadingService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
