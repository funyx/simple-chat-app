import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subject} from 'rxjs/Subject';

import { AppState } from '../../../_services/app.service';
import { Storage } from '../../../_services/storage.service';

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
  template: '<div class="room-header"><p>{{title}}</p></div>'
})
export class roomHeader implements OnInit {
  private _me : appUser;

  public chat : appRoom;
  public title : string;

  constructor(
    private _activeroute : ActivatedRoute,
    private _state: AppState,
    private _storage: Storage
  ){
    this._me = new appUser(this._storage.get('me'));
  }
  ngOnInit(){
    this._activeroute.params
      .map(params => params['uid'])
      .subscribe((uid) => {
        this.chat = new appRoom(this._state.get('active_chat'));
        this.title = this.chat.title(this._me.id);
      });
  }
}
