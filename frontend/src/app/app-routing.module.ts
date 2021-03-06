import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapholderComponent } from './mapholder/mapholder.component';
import { FriendsComponent } from './friends/friends.component';
import { MessagesComponent } from './messages/messages.component';
import { SignupComponent } from './signup/signup.component';

import { LoginComponent } from './Login/login/login.component';

import { AuthGuard } from './auth.guard'; 

const routes: Routes = [


	// before login
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: SignupComponent }, 

  	// after login
  { 
    path: 'kaart', 
    component: MapholderComponent ,
    canActivate: [AuthGuard]
  },
  { 
    path: 'friends',
    component: FriendsComponent, 
    canActivate: [AuthGuard]
  }, 
  { 
    path: 'mymessages',
    component: MessagesComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
