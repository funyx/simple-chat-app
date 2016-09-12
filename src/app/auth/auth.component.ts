import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppState } from '../app.service';

@Component({
  styleUrls: [ './auth.style.css' ],
  templateUrl: './auth.template.html'
})
export class Auth {
  ngOnInit() {
    console.log('hello `Auth` component');
  }
}
