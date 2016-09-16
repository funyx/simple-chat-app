import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { AppState } from '../app.service';
import { Io, SocketRequest, SocketResponse } from '../socket.service';

// Interfaces
import { Room } from '../_interfaces/room.interface';

@Injectable()
export class RoomService {
  private _rooms$: Subject<Room[]>;
  private dataStore: {
    rooms: Room[]
  };

  constructor(
    private _io: Io,
    private _appstate: AppState
  ) {
    this.dataStore = { rooms: [] };
    this._rooms$ = <Subject<Room[]>>new Subject();
    window['test'] = this;
  }

  get todos$() {
    return this._rooms$.asObservable();
  }

  loadAll(debug:boolean=false) {
    let r = {
      debug:debug,
      url:'/rooms',
      params:{me:this._appstate.get('me').id}
    };
    this._io.request$(new SocketRequest(r))
    .map(res => new SocketResponse(res).body.data)
    .subscribe(
      data => {
        this.dataStore.rooms = data;
        this._rooms$.next(this.dataStore.rooms);
      }
    );
  }

  load(uid: string,debug:boolean=false) {
    let r = {
      debug:debug,
      url:`/rooms/${uid}`,
      params:{me:this._appstate.get('me').id}
    };
    this._io.request$(new SocketRequest(r))
      .map(res => new SocketResponse(res).body.data)
      .subscribe(
        data => {
          let notFound = true;

          this.dataStore.rooms.forEach((item, index) => {
            if (item.uid === data.uid) {
              this.dataStore.rooms[index] = data;
              notFound = false;
            }
          });
          if (notFound) {
            this.dataStore.rooms.push(data);
          }
          this._rooms$.next(this.dataStore.rooms);
        }
      );
  }

  create(room: Room,debug:boolean=false) {
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

  update(room: Room,debug:boolean=false) {
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
