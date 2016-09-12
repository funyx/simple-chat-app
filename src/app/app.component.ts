import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router }       from '@angular/router';
import { AppState } from './app.service';
import { Storage } from './storage.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
      <router-outlet></router-outlet>
  `
})
export class App {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _storage: Storage
  ){
    let auth_setup = this._storage.get('auth_data');
    console.log(auth_setup);
    if(auth_setup.identifier && auth_setup.autoLogin){
      let me = this._storage.get('me');
      if(me){
        this._router.navigate(['/home']);
      }else{
      // Auto-login api
      // console.log(typeof this._auth.autoLogin(auth_setup.identifier),this._auth.autoLogin(auth_setup.identifier));
      }
    }
  }
  ngOnInit() {

  }

}
