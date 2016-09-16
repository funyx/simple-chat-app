import { Component } from '@angular/core';
@Component({
  selector: 'auth-welcome',
  template: `
    <h1 class="cover-heading">Simple Chat App</h1>
    <p class="lead">..welcome..make a choice</p>
    <p class="lead">
      <button routerLink="/auth/login" class="btn btn-sm btn-primary">Login</button>
      <button routerLink="/auth/register" class="btn btn-sm btn-primary">Register</button>
    </p>`
  ,
})
export class Welcome {
  constructor() {}
}
