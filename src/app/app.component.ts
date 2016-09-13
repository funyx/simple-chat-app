import { Component, ViewEncapsulation } from '@angular/core';
import { Router }       from '@angular/router';
import { AppState } from './app.service';
import { Storage } from './storage.service';
import { AuthService } from './auth/auth.service';

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
