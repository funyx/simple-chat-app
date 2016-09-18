import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { RouterModule }   from '@angular/router';

import { routes } from '../_routes/home.routes';
import { RoomResolver } from '../_resolvers/room.resolver';
import { RoomMessagesResolver } from '../_resolvers/room.messages.resolver';
import { RoomService } from '../_services/room.service';
import { MessageService } from '../_services/message.service';

import { Home } from './home.component';
import { Sidebar }   from './sidebar/sidebar.component';
import { Topbar }  from './topbar/topbar.component';
import { Welcome }  from './welcome/welcome.component';
import { Room }  from './room/room.component';
import { roomHeader }  from './room/partials/roomHeader.component';
import { roomBody }  from './room/partials/roomBody.component';
import { roomFooter }  from './room/partials/roomFooter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    Home,
    Topbar,
    Sidebar,
    Welcome,
    Room,
    roomHeader,
    roomBody,
    roomFooter
  ],
  providers: [
    MessageService,
    RoomResolver,
    RoomMessagesResolver,
    RoomService
  ]
})
export class HomeModule {
  static routes = routes;
}
