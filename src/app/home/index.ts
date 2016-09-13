import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { RouterModule }   from '@angular/router';

import { Home } from './home.component';
import { Sidebar }   from './sidebar/sidebar.component';
import { Topbar }  from './topbar/topbar.component';
import { Welcome }  from './welcome/welcome.component';

import { routes } from './home.routes';

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
    Welcome
  ]
})
export class HomeModule {
  static routes = routes;
}
