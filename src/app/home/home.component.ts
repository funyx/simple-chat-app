import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppState } from '../app.service';

@Component({
  styleUrls: [ './home.style.css' ],
  templateUrl: './home.template.html'
})
export class Home {
  public opa(){
    console.log('opa');
  }
}
