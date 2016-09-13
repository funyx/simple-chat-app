import { Injectable } from '@angular/core';

let sailsIOClient = require('sails.io.js');
let socketIOClient = require('socket.io-client');

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
    this.socket.on('room',(msg)=>{
      console.log('new socket message','room',msg);
    })
  }
}
