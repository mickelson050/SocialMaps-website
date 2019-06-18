import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapholderComponent } from './mapholder/mapholder.component';
import { FriendsComponent } from './friends/friends.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  { path: '', component: MapholderComponent },
  { path: 'friends', component: FriendsComponent }, 
  { path: 'mymessages', component: MessagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
