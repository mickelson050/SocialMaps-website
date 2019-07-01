import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms' 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapMenuComponent } from './map-menu/map-menu.component';
import { FriendsComponent } from './friends/friends.component';
import { MapholderComponent } from './mapholder/mapholder.component';
import { MessagesComponent } from './messages/messages.component';
import { SearchFriendsComponent } from './friends/search-friends/search-friends.component';
import { FriendsListItemComponent } from './friends/friends-list-item/friends-list-item.component'; 
import { LoginComponent } from './Login/login/login.component';
import { SignupComponent } from './signup/signup.component';


import { EventService } from './event.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapMenuComponent,
    FriendsComponent,
    MapholderComponent,
    MessagesComponent,
    SearchFriendsComponent,
    FriendsListItemComponent,
    LoginComponent,
    SignupComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyALJZuq_Fj4K-NYoFqE5tOhW4vPiY5nHr8'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService, EventService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
