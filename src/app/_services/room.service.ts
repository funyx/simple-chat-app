import { Injectable, ApplicationRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toArray';

import { AppState } from './app.service';
import { Io, SocketRequest, SocketResponse } from './socket.service';

import { appRoom } from '../_models/appRoom';
import { appUser } from '../_models/appUser';

import { Room } from '../_interfaces/room.interface';

@Injectable()
export class RoomService {
  private _rooms$: Subject<appRoom[]>;
  private _rooms_count$: Subject<number>;
  private me : appUser;
  private dataStore: {
    rooms: appRoom[],
    rooms_count: number
  };
  constructor(
    private _io: Io,
    private _appstate: AppState,
    private _ref: ApplicationRef
  ) {
    this.dataStore = { rooms: [],rooms_count: 0 };
    this.me = new appUser(this._appstate.get('me'));
    this._rooms$ = <Subject<appRoom[]>>new Subject();
    this._rooms_count$ = <Subject<number>>new Subject();
  }

  get rooms$() {
    return this._rooms$.asObservable();
  }
  get rooms_count$() {
    return this._rooms_count$.asObservable();
  }

  loadAll(debug:boolean=false) {
    let r = {
      debug : debug,
      url : '/rooms',
      params : {me:this.me.id}
    };
    this._io.request$(new SocketRequest(r))
    .map(res => new SocketResponse(res).body.data)
    .subscribe(
      (data : appRoom[]) => {
        this.dataStore.rooms = [];
        data.forEach((room,index)=>{
          if(room.id) this.dataStore.rooms.push(new appRoom(room,this.me));
        });
        this._rooms_count$.next(this.dataStore.rooms.length);
        this._rooms$.next(this.dataStore.rooms);
      },
      error => console.log(`Can't load rooms!`),
      // FUCKIN DIGEST THIS SHIT !!!!
      ()=>this._ref.tick()
    )
    // observable.map((res : any) =>res.body.data).toArray().subscribe(elements=>);
  }

  load(uid: string,debug:boolean=false) {
    let r = {
      debug:debug,
      url:`/rooms/${uid}`,
      params:{me:this.me.id}
    };
    this._io.request$(new SocketRequest(r))
      .map(res => new SocketResponse(res).body.data)
      .subscribe(
        data => {
          let notFound = true;
          this.dataStore.rooms.forEach((item, index) => {
            if (item.uid === data.uid) {
              this.dataStore.rooms[index] = new appRoom(data,this.me);
              notFound = false;
            }
          });
          if (notFound) {
            this.dataStore.rooms.push(new appRoom(data,this.me));
          }
          this._rooms$.next(this.dataStore.rooms);
          // console.log(this._rooms$);
        },
        error => console.log(`Can't load room!`),
        // FUCKIN DIGEST THIS SHIT !!!!
        ()=>this._ref.tick()
      );
  }

  create(room: Room,debug:boolean=false) {
    console.log(room);
    // return alert('not implemented');
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

  update(room: any,debug:boolean=false) {
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
