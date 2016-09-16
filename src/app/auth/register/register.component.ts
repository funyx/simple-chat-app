import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';

import { AppState } from '../../_services/app.service';
import { AuthService } from '../../_services/auth.service';
import { Storage } from '../../_services/storage.service';

import { appUser } from '../../_models/appUser';
import { appRoom } from '../../_models/appRoom';
import { RegisterModel } from './register';

@Component({
  selector: 'register-form',
  styleUrls: [
    './register.style.css'
  ],
  templateUrl: './register.component.html'
})
export class Register{
  public model = new RegisterModel('','','','','');
  public registration_error = false;
  public registration_error_code;
  public registration_error_message;
  public registration_error_data;
  @ViewChild('registerForm') form;
  constructor(
    private _router: Router,
    private _storage: Storage,
    private _service: AuthService,
    private _state: AppState
  ){}
  doRegister(data) {
    event.preventDefault();
    this.registration_error = false;
    let register_data = Object.assign({},this.model);
    delete register_data.confirm_password;

    if(register_data.public_name === '')register_data.public_name=register_data.username;
    let response:{data:{error}};
    this._service.register(
      register_data.username,
      register_data.email,
      register_data.public_name,
      register_data.password)
      .then((response)=>{
        let r:any;
        r = response;
        // let rooms : List[] = r.rooms;
        // this._state.set('rooms',rooms);
        r.is_online=true;
        this._storage.save('me',new appUser(r));
        this._router.navigate(['/home']);
      },(error)=>{
        this.registration_error = true;
        this.registration_error_code = error.response.code;
        this.registration_error_message = error.response.message;
        this.registration_error_data = error.response.data;
      });
  }
  ngAfterViewInit() {
    console.log(this.registration_error);
    this.form.control.valueChanges
      .subscribe(values => {
        if(this.registration_error){
          this.registration_error = false;
          this.registration_error_code = false;
          this.registration_error_message = false;
          this.registration_error_data = false;
        }
    });
  }
}
