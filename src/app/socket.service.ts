import { Injectable } from '@angular/core';

let sailsIOClient = require('sails.io.js');
let socketIOClient = require('socket.io-client');

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

interface SocketRequest {
  url:string;
  method:string;
  params:any;
  headers:any;
  debug:boolean;
}
class SocketRequestModel implements SocketRequest{
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
  public request$( params : any ){
    params = new SocketRequestModel( params );
    let request = new Observable(observer => {
        this.socket.request(params.getParams(),function(response_body,response){
          if(response.statusCode===200){
            observer.next(response);
            if(params.isDebug())return console.log(`${response.statusCode} : ${params.url}`,response);
          }else{
            observer.error(response);
            if(params.isDebug())return console.log(`${response.statusCode} : ${params.url}`,response);
            throw new Error(`${response.statusCode} : ${params.url} -> ${response.error.message}`);
          }
          observer.complete();
        })
    });
    return request;
  }
}
