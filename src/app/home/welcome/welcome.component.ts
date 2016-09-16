import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from '../../_services/app.service';
import { Storage } from '../../_services/storage.service';

import { appRoom } from '../../_models/appRoom';
import { appUser } from '../../_models/appUser';

@Component({
  selector: 'homeWelcome',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './welcome.style.css'
  ],
  templateUrl:'./welcome.component.html',
})

export class Welcome {
  constructor(
    private _storage: Storage,
    private _state: AppState
  ) {
    // console.log(this._state.get('rooms'));
  }
  ngAfterViewInit() {
  }
}
