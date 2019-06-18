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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapMenuComponent,
    FriendsComponent,
    MapholderComponent,
    MessagesComponent,
    SearchFriendsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyALJZuq_Fj4K-NYoFqE5tOhW4vPiY5nHr8'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
