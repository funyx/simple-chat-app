import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { RouterModule }   from '@angular/router';

import { routes } from '../_routes/auth.routes';
import { Storage } from '../_services/storage.service';

import { Auth } from './auth.component';
import { Login }   from './login/login.component';
import { Register } from './register/register.component';
import { Welcome }  from './welcome/welcome.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    Auth,
    Login,
    Register,
    Welcome
  ]
})
export class AuthModule {
  static routes = routes;
}
