import { Injectable } from '@angular/core';
import { Io } from '../socket.service';
import { Storage } from '../storage.service';

@Injectable()
export class RoomsService {
  private _me;
  constructor(
    private _storage: Storage,
    private _io : Io
  ){
    this._me = this._storage.get('me');
  }

  private promisify_post(url,data){
    return new Promise((res,rej)=>{
      this._io.socket.post(
        url,
        data
      ,function(response_body,response){
        console.log(response_body.data);
        if(response.statusCode===200){
          res(response_body.data);
        }else{
          rej({error:true,error_msg:`socket reponse code ${response.statusCode}`,response:response.error});
        }
      })
    });
  }
  loadRoom(uid:string){
    return this.promisify_post('/room/messages',{
      uid
    });
  }
  sendMsg(uid:string,author:number,content:string){
    return this.promisify_post('/room/message',{
      author,
      uid,
      content
    });
  }
  initRoom(vars:any[]) {
    return this.promisify_post('/room/init',{
      vars
    });
  }
}
