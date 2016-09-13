import { Component } from '@angular/core';
import { Storage } from '../../storage.service';

import { appUser } from '../../_models/appUser';
import { TopbarModel } from './topbar';

@Component({
  selector: 'topbar',
  styleUrls: [
    './topbar.style.css'
  ],
  templateUrl:'./topbar.component.html',
})

export class Topbar {
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
