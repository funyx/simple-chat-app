import { Injectable } from '@angular/core';
import { Io } from './socket.service';
import { Storage } from '../storage.service';

@Injectable()
export class UsersService {
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

  get_online(identifier: string) {
    return this.promisify_post('/users/online',{
      identifier
    });
  }
}
