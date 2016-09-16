import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppState } from '../../../app.service';
import { appRoom } from '../../../_models/appRoom';
import { appUser } from '../../../_models/appUser';
import { appMessages } from '../../../_models/appMessages';
import { RoomService } from '../../rooms.service';
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
        [(ngModel)]="content"
        (keyup)="newMessage($event)"
        name="message"
        required
        autocomplete="off" autofocus></textarea>
    </form>
  `
})

export class chatFooter implements OnInit {
  private _uid : string;
  private _me : appUser;
  public content;
  constructor(
    private _activeroute:ActivatedRoute,
    private _app:AppState,
    private _rooms:RoomService
  ){
    this._me = new appUser(this._app.get('me'));
  }
  public newMessage(e){
    if(e.keyCode === 13){
      e.preventDefault();
      var component = this;
      this._rooms.sendMsg(this._uid,this._me.id,this.content)
        .then((res) => {
          this.content='';
          // component._rooms.newMessage(res);
        })
        .catch((err) => {
          console.log('newMessage err',err);
        })
    }
  }
  ngOnInit(){
    this._activeroute.params
      .map(params => params['uid'])
      .subscribe((uid) => {
        this.content = '';
        this._uid = uid;
      })
  }
}
