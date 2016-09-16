import { Component, ViewEncapsulation, OnInit, OnDestroy }  from '@angular/core';
import { ActivatedRoute, Router }                           from '@angular/router';
import { appUser } from '../../_models/appUser';
import { appRoom } from '../../_models/appRoom';
import { AppState } from '../../_services/app.service';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

@Component({
  selector: 'chat',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './room.style.css'
  ],
  templateUrl:'./room.component.html',
})

export class Room implements OnInit, OnDestroy {
  constructor(
    private _activeroute: ActivatedRoute,
  ) {
  }
  ngOnInit() {
    this._activeroute.params
      .map(params => params['uid'])
      .subscribe((uid) => {
        // console.log(uid);
      });
  }
  ngOnDestroy() {
    //
  }
}
