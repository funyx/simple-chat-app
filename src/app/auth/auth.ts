import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { Auth } from './auth.component';
import { Title } from './title';

describe('Auth', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      AppState,
      Title,
      Auth
    ]
  }));

  // it('should have default data', inject([ Auth ], (auth: Auth) => {
  //   expect(auth.localState).toEqual({ value: '' });
  // }));
  //
  // it('should have a title', inject([ Auth ], (auth: Auth) => {
  //   expect(!!auth.title).toEqual(true);
  // }));

  // it('should log ngOnInit', inject([ Auth ], (auth: Auth) => {
  //   spyOn(console, 'log');
  //   expect(console.log).not.toHaveBeenCalled();
  //
  //   auth.ngOnInit();
  //   expect(console.log).toHaveBeenCalled();
  // }));

});
