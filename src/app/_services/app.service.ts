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
  ){}
  get state() {
    return this._state = this._clone(this._state);
  }
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }
  get(prop?: any) {
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : (this._storage.get(`${prop}`) ? this._storage.get(`${prop}`) : false);
  }
  set(prop: string, value: any) {
    this._storage.save(`${prop}`,value);
    return this._state[prop] = value;
  }
  private _clone(object: InteralStateType) {
    return Object.assign({},object);
  }
}
