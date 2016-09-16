import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { AppState } from './app.service';
import { Io, SocketRequest, SocketResponse } from './socket.service';

// Interfaces
import { User } from '../_interfaces/user.interface';

@Injectable()
export class UserService {
  private _users$: Subject<User[]>;
  private dataStore: {
    users: User[]
  };

  constructor(
    private _io: Io,
    private _appstate: AppState
  ) {
    this.dataStore = { users: [] };
    this._users$ = <Subject<User[]>>new Subject();
    window['user'] = this;
  }

  get todos$() {
    return this._users$.asObservable();
  }

  loadAll(debug:boolean=false) {
    let r = {
      debug:debug,
      url:'/users',
      params:{me:this._appstate.get('me').id}
    };
    this._io.request$(new SocketRequest(r))
    .map(res => new SocketResponse(res).body.data)
    .subscribe(
      data => {
        this.dataStore.users = data;
        this._users$.next(this.dataStore.users);
      }
    );
  }

  load(uid: string,debug:boolean=false) {
    let r = {
      debug:debug,
      url:`/users/${uid}`,
      params:{me:this._appstate.get('me').id}
    };
    this._io.request$(new SocketRequest(r))
      .map(res => new SocketResponse(res).body.data)
      .subscribe(
        data => {
          let notFound = true;

          this.dataStore.users.forEach((item, index) => {
            if (item.id === data.id) {
              this.dataStore.users[index] = data;
              notFound = false;
            }
          });
          if (notFound) {
            this.dataStore.users.push(data);
          }
          this._users$.next(this.dataStore.users);
        }
      );
  }

  create(user: User,debug:boolean=false) {
    return alert('not implemented');
    // let r = {
    //   debug:debug,
    //   url:`/rooms`,
    //   params:{me:this._appstate.get('me').id}
    // };
    // this._io.socket.post(`/rooms`, JSON.stringify(room))
    //   .map(response => response.json()).subscribe(data => {
    //     this.dataStore.rooms.push(data);
    //     this._rooms$.next(this.dataStore.rooms);
    //   }, error => console.log('Could not create room.'));
  }

  update(room: User,debug:boolean=false) {
    return alert('not implemented');
    // let r = {
    //   debug:debug,
    //   url:`/rooms/${room.uid}`,
    //   params:{me:this._appstate.get('me').id}
    // };
    // this._io.socket.put(`/rooms/${room.id}`, JSON.stringify(room))
    //   .map(response => response.json()).subscribe(data => {
    //     this.dataStore.rooms.forEach((todo, i) => {
    //       if (todo.id === data.id) { this.dataStore.rooms[i] = data; }
    //     });
    //
    //     this._rooms$.next(this.dataStore.rooms);
    //   }, error => console.log('Could not update room.'));
  }

  remove(roomId: number) {
    return alert('not implemented');
    // this._io.socket.delete(`/rooms/${roomId}`).subscribe(response => {
    //   this.dataStore.rooms.forEach((t, i) => {
    //     if (t.id === todoId) { this.dataStore.rooms.splice(i, 1); }
    //   });
    //
    //   this._rooms$.next(this.dataStore.rooms);
    // }, error => console.log('Could not delete room.'));
  }
}
