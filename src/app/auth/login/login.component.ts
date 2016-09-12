import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';
// import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";

import { LoginModel } from './login';

@Component({
  selector: 'login-form',
  styleUrls: [
    './login.style.css'
  ],
  // directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ],
  templateUrl:'./login.component.html',
})

export class Login implements OnInit, OnDestroy {
  public model = new LoginModel('','',false);
  constructor(
    public router: Router,
    public http: Http,
    private service: AuthService
  ) {
  }
  doLogin(data) {
    event.preventDefault();
    console.log(data,this.model);
    // set autologin if we have success
    let auth_setup = Object.assign({},this.model);
    delete auth_setup.password;
    this.service.save('auth_setup', auth_setup);
  }
  ngOnInit() {
    let auth_setup = this.service.get('auth_setup');
    if(auth_setup.autoLogin) this.service.autoLogin(auth_setup.identifier)
  }

  ngOnDestroy() {

  }
}
