import { Component } from '@angular/core';

import { AppState } from '../app.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'auth'
  // selector: 'auth',  // <auth></auth>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  // providers: [
  //   Title
  // ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './auth.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './auth.template.html'
})
export class Auth {
  // Set our default values
  // localState = { value: '' };
  // // TypeScript public modifiers
  // constructor(public appState: AppState, public title: Title) {
  //
  // }
  //
  ngOnInit() {
    console.log('hello `Auth` component');
    // this.title.getData().subscribe(data => this.data = data);
  }
  //
  // submitState(value: string) {
  //   console.log('submitState', value);
  //   this.appState.set('value', value);
  //   this.localState.value = '';
  // }
}
