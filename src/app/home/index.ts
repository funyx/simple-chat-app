import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { RouterModule }   from '@angular/router';

import { Home } from './home.component';
import { Sidebar }   from './sidebar/sidebar.component';
import { Topbar }  from './topbar/topbar.component';
import { Welcome }  from './welcome/welcome.component';
import { Chat }  from './chat/chat.component';
import { chatHeader }  from './chat/partials/chatHeader.component';
import { chatBody }  from './chat/partials/chatBody.component';
import { chatFooter }  from './chat/partials/chatFooter.component';

import { routes } from './home.routes';
import { RoomsService } from './rooms.service';

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
    RoomsService
  ]
})
export class HomeModule {
  static routes = routes;
}
