import { Component, Input, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../_services/app.service';
import { RoomService } from '../../../_services/room.service';

import { appMessages } from '../../../_models/appMessages';
import { appRoom } from '../../../_models/appRoom';
import { appUser } from '../../../_models/appUser';
import { newChatMessage } from './newChatMessage';

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
        (keyup)="newMessage($event)"
        name="message"
        required
        autocomplete="off" autofocus></textarea>
    </form>
  `
})

export class roomFooter implements OnInit {
  @Input() room: Observable<appRoom>;
  @Input() me: appUser;
  constructor(

  ){

  }
  ngOnInit(){

  }
}
