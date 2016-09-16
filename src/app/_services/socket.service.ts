import { Injectable } from '@angular/core';

let sailsIOClient = require('sails.io.js');
let socketIOClient = require('socket.io-client');

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

export interface SocketRequestInterface {
  url:string;
  method:string;
  params:any;
  headers:any;
  debug:boolean;
}
export class SocketRequest implements SocketRequestInterface{
  public url:string;
  public method:string;
  public params:any;
  public headers:any;
  public debug:boolean;
  constructor(data:any){
    this.method   = data.method   || "get",   // e.g. "get", "post", "put", or "delete", etc.
    this.url      = data.url      || "/",     // e.g. "/foo/bar"'
    this.params   = data.params   || {},      // e.g. { emailAddress: "mike@sailsjs.org" }
    this.headers  = data.headers  || {},      // e.g. { "x-my-custom-header": "some string" }
    this.debug    = data.debug    || false
  }
  public getParams(){
    return {
      method  : this.method,
      url     : this.url,
      params  : this.params,
      headers : this.headers
    }
  }
  public isDebug(){
    return this.debug === true;
  }
}
export interface SocketResponseInterface {
  body:any;
  error:any;
  headers:any;
  statusCode:number;
  debug:boolean;
}
export class SocketResponse implements SocketResponseInterface{
  public body:any;
  public error:any;
  public headers:any;
  public statusCode:number;
  public debug:boolean;
  constructor(data:any){
    this.body       = data.body         || {},
    this.error      = data.error        || {},
    this.headers    = data.headers      || {},
    this.statusCode = data.statusCode   || 200,
    this.debug      = data.debug        || false
  }
  public success(){
    return this.statusCode === 200;
  }
  public isDebug(){
    return this.debug === true;
  }
}
// var socket = io.sails.connect();
@Injectable()
export class Io {
  public socket;
  constructor(){
    // Instantiate the socket client (`io`)
    let io = sailsIOClient(socketIOClient)
    io.sails.transports = ['websocket']
    io.sails.url = 'http://localhost:1234'
    io.sails.autoConnect = false;
    this.socket = io.sails.connect();
    this.bind_events();
  }
  bind_events(){
    this.socket.on('user',(msg)=>{
      console.log('new socket message','user',msg);
    })
    this.socket.on('user_logged_in',(msg)=>{
      console.log('new socket message','user_logged_in',msg);
    })
    this.socket.on('room',(msg)=>{
      console.log('new socket message','room',msg);
    })
  }
  // turn requests into observables
  public request$( data : SocketRequestInterface ){
    let model = new SocketRequest( data );
    let request = new Observable(observer => {
        if(model.isDebug()) console.log(model);
        this.socket.request(model.getParams(),function(body,res){
          let response = new SocketResponse(Object.assign({debug : model.isDebug()},res));
          if(response.success()){
            observer.next(response);
            if(response.isDebug())return console.log(response);
          }else{
            observer.error(response);
            if(response.isDebug())return console.log(response);
            throw new Error(`${response.statusCode} : ${model.url} -> ${response.error.message}`);
          }
          observer.complete();
        })
    });
    return request;
  }
}
