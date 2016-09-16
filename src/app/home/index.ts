import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { RouterModule }   from '@angular/router';

import { routes } from '../_routes/home.routes';
import { RoomService } from '../_services/room.service';

import { Home } from './home.component';
import { Sidebar }   from './sidebar/sidebar.component';
import { Topbar }  from './topbar/topbar.component';
import { Welcome }  from './welcome/welcome.component';
import { Chat }  from './chat/chat.component';
import { chatHeader }  from './chat/partials/chatHeader.component';
import { chatBody }  from './chat/partials/chatBody.component';
import { chatFooter }  from './chat/partials/chatFooter.component';

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
    Chat,
    chatHeader,
    chatBody,
    chatFooter
  ],
  providers: [
    RoomService
  ]
})
export class HomeModule {
  static routes = routes;
}
