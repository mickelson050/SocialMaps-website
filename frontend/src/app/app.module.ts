import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapMenuComponent } from './map-menu/map-menu.component';
import { FriendsComponent } from './friends/friends.component';
import { MapholderComponent } from './mapholder/mapholder.component';
import { MessagesComponent } from './messages/messages.component';
import { SearchFriendsComponent } from './friends/search-friends/search-friends.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Login/register/register.component';
import { RequestResetComponent } from './Login/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './Login/password/response-reset/response-reset.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapMenuComponent,
    FriendsComponent,
    MapholderComponent,
    MessagesComponent,
    SearchFriendsComponent, 
    LoginComponent,
    RegisterComponent,
    RequestResetComponent,
    ResponseResetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyALJZuq_Fj4K-NYoFqE5tOhW4vPiY5nHr8'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
