import { Component, ViewEncapsulation } from '@angular/core';
import { Router }       from '@angular/router';
import { AppState } from './_services/app.service';
import { AuthService } from './_services/auth.service';
import { Storage } from './_services/storage.service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
      <router-outlet></router-outlet>
  `
})
export class App{
  private _auth_setup;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _storage: Storage
  ){}
}
