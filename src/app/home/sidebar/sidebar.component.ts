import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../_services/app.service';
import { RoomService } from '../../_services/room.service';
import { Storage } from '../../_services/storage.service';
import { UserService } from '../../_services/user.service';

import { appRoom } from '../../_models/appRoom';
import { appUser } from '../../_models/appUser';

@Component({
  selector: 'sidebar',
  styleUrls: [
    './sidebar.style.css'
  ],
  templateUrl:'./sidebar.component.html',
})

export class Sidebar implements OnInit, OnDestroy {
  private me : appUser;
  private rooms: Observable<appRoom[]>;
  private rooms_count: Observable<number>;
  constructor(
    private _rooms: RoomService,
    private _router: Router,
    private _storage: Storage,
    private _state: AppState
  ) {

  }
  ngOnInit(){
    this.me = new appUser(this._storage.get('me'));
    this.rooms = this._rooms.rooms$;
    this.rooms_count = this._rooms.rooms_count$;
    this._rooms.loadAll();
  }
  ngOnDestroy(){}
}
