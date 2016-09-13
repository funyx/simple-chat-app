import { Injectable }       from '@angular/core';
import { CanActivate, Router }   from '@angular/router';

import { Storage } from './storage.service';
import { appUser } from './_models/appUser';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private _auth_setup;
  private _me;
    constructor(
      private _router: Router,
      private _service: AuthService,
      private _storage: Storage
    ) { }

    canActivate() {
      this._auth_setup  = this._storage.get('auth_data');
      this._me = this._storage.get('me');
      if(this._auth_setup && this._auth_setup.identifier && this._auth_setup.autoLogin){
        if(this._me && this._me.username){
          return true;
        }else{
          this._service.autoLogin(this._auth_setup.identifier)
            .then(response=>{
              let r:any;
              r = response;
              if(r&&r.error){
              }else{
                this._storage.save('me',new appUser(r));
                this._router.navigate(['/home']);
              }
            },(err)=>{
              this._router.navigate(['/auth/welcome']);
              return false;
            });
        }
      }else if(this._me && this._me.username){
        return true;
      }else{
        this._router.navigate(['/auth/welcome']);
        return false;
      }
    }
}
