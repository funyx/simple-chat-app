import { Component, ViewEncapsulation, OnInit }  from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { AppState } from '../../_services/app.service';
import { RoomService } from '../../_services/room.service';

import { appRoom } from '../../_models/appRoom';
import { appUser } from '../../_models/appUser';

@Component({
  selector: 'room',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './room.style.css'
  ],
  templateUrl:'./room.component.html',
})

export class Room implements OnInit {
  public room : appRoom;
  public me : appUser;
  constructor(
    private _activeroute: ActivatedRoute,
    private _state: AppState,
    private _router: Router
  ) {
    this.me = new appUser(this._state.get('me'));
  }
  ngOnInit() {
    this._activeroute.data.forEach((data : any) => {
      if(data.room)this.room = data.room;
    });
  }
}
