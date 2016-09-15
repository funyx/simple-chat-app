import { Component, ViewEncapsulation } from '@angular/core';
import { Storage } from '../../storage.service';
import { appUser } from '../../_models/appUser';
import { appRoom } from '../../_models/appRoom';
import { AppState } from '../../app.service';

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
