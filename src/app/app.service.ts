import { Injectable } from '@angular/core';
import { Storage } from './storage.service';

export type InteralStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InteralStateType = { };

  constructor(
    private _storage : Storage
  ) {

  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : (this._storage.get(`${prop}`) ? this._storage.get(`${prop}`) : false);
  }

  set(prop: string, value: any) {
    // internally mutate our state
    this._storage.save(`${prop}`,value);
    return this._state[prop] = value;
  }


  private _clone(object: InteralStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
