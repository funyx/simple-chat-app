import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';

import { AppState } from '../../_services/app.service';
import { AuthService } from '../../_services/auth.service';
import { Storage } from '../../_services/storage.service';

import { appUser } from '../../_models/appUser';
import { appRoom } from '../../_models/appRoom';
import { LoginModel } from './login';

@Component({
  selector: 'login-form',
  styleUrls: [
    './login.style.css'
  ],
  templateUrl:'./login.component.html',
})

export class Login {
  public model = new LoginModel('','',false);
  public login_error = false;
  public login_error_message;
  @ViewChild('loginForm') form;
  constructor(
    private _router: Router,
    private _storage: Storage,
    private _service: AuthService,
    private _state: AppState
  ){}
  doLogin(data) {
    event.preventDefault();
    let auth_data = Object.assign({},this.model);
    this._service.login(
      auth_data.identifier,
      auth_data.password,
      auth_data.autoLogin
    ).then((login_resp)=>{
      let r:any;
      r = login_resp;
      if(r&&r.error){
        this.login_error = true;
        this.login_error_message = r.error_msg;
      }else{
        if(auth_data.autoLogin){
          delete auth_data.password;
          this._storage.save('auth_data', auth_data);
        }
        delete r.error;
        delete r.error_msg;
        // let rooms : Room[] = r.rooms;
        // this._state.set('rooms',rooms);
        r.is_online = true;
        this._storage.save('me',new appUser(r));
        this._router.navigate(['/home']);
      }
    },(error)=>{console.log('error',error);alert(error.error_msg);});
  }
  ngAfterViewInit() {
    this.form.control.valueChanges
      .subscribe(values => {
        if(this.login_error){
          this.login_error = false;
          this.login_error_message = false;
        }
    });
  }
}
