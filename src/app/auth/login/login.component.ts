import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { AuthService } from '../auth.service';
import { Storage } from '../../storage.service';
// import { Subscription } from 'rxjs/Subscription';

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
    private storage: Storage,
    private service: AuthService
  ) {
  }
  doLogin(data) {
    event.preventDefault();
    console.log(data,this.model);
    // set autologin if we have success
    let auth_data = Object.assign({},this.model);
    delete auth_data.password;
    this.service.login(
      auth_data.identifier,
      auth_data.password,
      auth_data.autoLogin
    ).then((login_resp)=>{
      console.log(login_resp);
    },(error)=>{console.log(error);alert(error.error_msg)});
    this.storage.save('auth_data', auth_data);
  }
  ngOnInit() {
    // let auth_setup = this.storage.get('auth_data');
    // // login if we have auto-login
    // // if(auth_setup.autoLogin) this.service.autoLogin(auth_setup.identifier)
    // alert('You will be auto-logged in');
  }

  ngOnDestroy() {

  }
}
