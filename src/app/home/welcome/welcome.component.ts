import { Component, ViewEncapsulation } from '@angular/core';
import { Storage } from '../../storage.service';

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
  ) {
  }
  doLogin(data) {
    event.preventDefault();
  }
  ngAfterViewInit() {
  }
}
