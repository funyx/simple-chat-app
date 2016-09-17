import { Component, Input, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../_services/app.service';
import { RoomService } from '../../../_services/room.service';

import { appRoom } from '../../../_models/appRoom';
import { appUser } from '../../../_models/appUser';
import { appMessages } from '../../../_models/appMessages';

@Component({
  selector: 'room-body',
  encapsulation: ViewEncapsulation.None,
  styles:[`
    room-body{
      position:absolute;
      bottom:0px;
      height: 100%;
      width: 100%;
    }
    .chat-thread{
      margin: 5.5rem auto 7rem;
      position: relative;
      bottom: 0px;
    }
    .chat-tread-wrapper{
      position: absolute;
      width: 100%;
      max-height: 100%;
      overflow: auto;
      right: 0px;
      bottom: 0px;
    }
  `],
  template: `
  <div class="chat-tread-wrapper">
    <ul class="chat-thread">
    	<li
        *ngFor="let m of messages"
        [ngClass]="{'me': m.amI(me.id),'not-me': !m.amI(me.id) }"
        >{{m.content}}</li>
    </ul>
  </div>
  `
})
export class roomBody implements OnInit {
  @Input() room: Observable<appRoom>;
  @Input() me: appUser;
  constructor(

  ){

  }
  ngOnInit(){

  }
}
