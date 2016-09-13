import { Injectable } from '@angular/core';
import { Io } from '../socket.service';
import { Storage } from '../storage.service';

@Injectable()
export class AuthService {
  constructor(
    private _io : Io
  ){
    // console.log('im fired',this._io);
  }

  private promisify_post(url,data){
    return new Promise((res,rej)=>{
      this._io.socket.post(
        url,
        data
      ,function(response_body,response){
        if(response.statusCode===200){
          res(response_body.data);
        }else{
          rej({error:true,error_msg:`socket reponse code ${response.statusCode}`,response:response.error});
        }
      })
    });
  }

  login(identifier: string, password: string, autoLogin: boolean) {
    return this.promisify_post('/auth/login',{
      identifier,
      password,
      autoLogin
    });
  }

  register(username: string, email: string, public_name: string, password: string) {
    return this.promisify_post('/auth/register',{
      username,
      email,
      public_name,
      password
    });
  }

  autoLogin(identifier: string){
    return this.promisify_post('/user/autoLogin',{
      identifier
    });
  }
  //
  // save(id,obj){
  //   var duplicate = Object.assign({}, obj)
  //   localStorage.setItem(`${id}`, JSON.stringify(duplicate));
  // }
  //
  // get(id){
  //   return JSON.parse(localStorage.getItem(`${id}`));
  // }

  // addCrisis(name: string) {
    // name = name.trim();
    // if (name) {
    //   let crisis = new Crisis(CrisisService.nextCrisisId++, name);
    //   crisesPromise.then(crises => crises.push(crisis));
    // }
  // }
}
