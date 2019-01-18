import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MessagesComponent } from './messages/messages.component';
import { UserModule } from './user/user.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MomentsModule } from './moments/moments.module';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MessagesComponent,
    HomeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserModule,
    MomentsModule,
    AppRoutingModule,   // notice the order of router
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
