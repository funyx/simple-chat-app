import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { Crisis, CrisisService } from './crisis.service';
import { Subscription }          from 'rxjs/Subscription';
@Component({
  template: `<h1 class="cover-heading">Simple Chat App</h1>
    <p class="lead">..REGISTER..make a choice</p>
    <p class="lead">
      <button class="btn btn-sm btn-primary">Login</button>
      <button class="btn btn-sm btn-primary">Register</button>
    </p>`
  ,
})
export class Register {}
