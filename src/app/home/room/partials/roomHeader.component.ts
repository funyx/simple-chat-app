import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../_services/app.service';
import { RoomService } from '../../../_services/room.service';

import { appMessage } from '../../../_models/appMessage';
import { appRoom } from '../../../_models/appRoom';
import { appUser } from '../../../_models/appUser';

@Component({
  selector: 'room-header',
  encapsulation: ViewEncapsulation.None,
  styles: [`
  room-header{
    background: rgba(0,0,0,0.75);
    width: 100%;
    height: 3rem;
    position: absolute;
    color:white;
  }
  .room-header>p{
    padding: 0.7rem;
  }
  `],
  template: '<div class="room-header"><p>{{room?.title()}}</p></div>'
})
export class roomHeader implements OnInit{
  @Input() room: appRoom;
  @Input() me: appUser;
  @Input() messages: appMessage[];
  constructor(
  ){}
  ngOnInit(){
  }
}
