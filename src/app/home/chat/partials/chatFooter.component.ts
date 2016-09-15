import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppState } from '../../../app.service';
import { appRoom } from '../../../_models/appRoom';
import { appUser } from '../../../_models/appUser';
import { appMessages } from '../../../_models/appMessages';
import { RoomsService } from '../../rooms.service';
import { newChatMessage } from './newChatMessage';

@Component({
  selector: 'chat-footer',
  encapsulation: ViewEncapsulation.None,
  styles: [`
  chat-footer{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  chat-footer .chat-window{
    background: rgba(0,0,0,0.75);
    position: relative;
    bottom: 3rem;
    margin-left: 5px;
  }
  chat-footer .chat-window .chat-window-message{
    text-align: right;
    padding: 0.5rem;
    font: 1rem 'Noto Sans', sans-serif;
    border: none;
    -webkit-box-shadow: 0px -8px 33px -12px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px -8px 33px -12px rgba(0,0,0,0.75);
    box-shadow: 0px -8px 33px -12px rgba(0,0,0,0.75);
    resize: none;
  }
  `],
  template: `
    <form class="chat-window"
      #registerForm="ngForm">
      <textarea
        class="chat-window-message"
        [(ngModel)]="model.content"
        (keyup)="newMessage($event,this.value)"
        #content="ngModel"
        name="message"
        required
        autocomplete="off" autofocus></textarea>
    </form>
  `
})
// class newMessageModell {
//   constructor(
//     public content:string
//   ){}
// }

export class chatFooter implements OnInit {
  private _uid : string;
  private _me : appUser;
  public model : newChatMessage;
  constructor(
    private _activeroute:ActivatedRoute,
    private _app:AppState,
    private _rooms:RoomsService
  ){
    this._me = new appUser(this._app.get('me'));
    this.model = new newChatMessage('');
  }
  public newMessage(e){
    if(e.keyCode === 13){
      e.preventDefault();
      return console.log(e,this);
      // this._rooms.sendMsg(this._uid,this._me.id,this.model.content)
      //   .then(function(res){
      //     this.model.content = '';
      //     console.log(res)
      //   })
      //   .catch(function(err){
      //     console.log(err);
      //   })
    }
  }
  ngOnInit(){
    this._activeroute.params
      .map(params => params['uid'])
      .subscribe((uid) => {
        this.model.content = '';
        this._uid = uid;
      })
  }
}
