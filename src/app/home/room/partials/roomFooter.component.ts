import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from '../../../_services/message.service';

import { appRoom } from '../../../_models/appRoom';
import { appUser } from '../../../_models/appUser';
import { appMessage } from '../../../_models/appMessage';

@Component({
  selector: 'room-footer',
  encapsulation: ViewEncapsulation.None,
  styles: [`
  room-footer{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  room-footer .chat-window{
    background: rgba(0,0,0,0.75);
    position: relative;
    bottom: 3rem;
    margin-left: 5px;
  }
  room-footer .chat-window .chat-window-message{
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
        (keydown)="stop"
        (keyup)="publish($event)"
        name="content"
        required
        autocomplete="off" autofocus></textarea>
    </form>
  `
})

export class roomFooter implements OnInit {
  private content:string;
  @Input() room: appRoom;
  @Input() me: appUser;
  @Input() messages: appMessage[];
  constructor(
    private _service: MessageService
  ){ }
  stop(event){
    event.stopPropagation();
  }
  publish(event){
    if(event.keyCode===13){
      event.stopPropagation();
      event.preventDefault();
      if(!(this.content) || this.content == '') return false;
      let msg:any = {
        content : this.content,
        author : this.me,
        room : this.room
      };
      this._service.create(new appMessage(msg),true);
      this.content = '';
    }
  }
  ngOnInit(){ }
}
