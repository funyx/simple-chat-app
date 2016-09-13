import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { AuthService } from '../auth.service';
import { Storage } from '../../storage.service';

import { appUser } from '../../_models/appUser';
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
    public router: Router,
    private _router: Router,
    private _storage: Storage,
    private _service: AuthService
  ) {
  }
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
        r.is_online=true;
        this._storage.save('me',new appUser(r));
        this.router.navigate(['/home']);
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
