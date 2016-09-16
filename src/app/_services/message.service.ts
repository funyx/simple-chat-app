import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { AppState } from './app.service';
import { Io, SocketRequest, SocketResponse } from './socket.service';

// Interfaces
import { Message } from '../_interfaces/message.interface';

@Injectable()
export class MessageService {
  private _messages$: Subject<Message[]>;
  private dataStore: {
    messages: Message[]
  };

  constructor(
    private _io: Io,
    private _appstate: AppState
  ) {
    this.dataStore = { messages: [] };
    this._messages$ = <Subject<Message[]>>new Subject();
    window['message'] = this;
  }

  get messages$() {
    return this._messages$.asObservable();
  }

  loadAll(uid:'string',debug:boolean=false) {
    let r = {
      debug:debug,
      url:'/messages',
      params:{
        me  :this._appstate.get('me').id,
        uid :uid
      }
    };
    this._io.request$(new SocketRequest(r))
    .map(res => new SocketResponse(res).body.data)
    .subscribe(
      data => {
        this.dataStore.messages = data;
        this._messages$.next(this.dataStore.messages);
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

          this.dataStore.messages.forEach((item, index) => {
            if (item.uid === data.uid) {
              this.dataStore.messages[index] = data;
              notFound = false;
            }
          });
          if (notFound) {
            this.dataStore.messages.push(data);
          }
          this._messages$.next(this.dataStore.messages);
        }
      );
  }

  create(room: Message,debug:boolean=false) {
    return alert('not implemented');
    // let r = {
    //   debug:debug,
    //   url:`/rooms`,
    //   params:{me:this._appstate.get('me').id}
    // };
    // this._io.socket.post(`/rooms`, JSON.stringify(room))
    //   .map(response => response.json()).subscribe(data => {
    //     this.dataStore.messages.push(data);
    //     this._messages$.next(this.dataStore.messages);
    //   }, error => console.log('Could not create room.'));
  }

  update(room: Message,debug:boolean=false) {
    return alert('not implemented');
    // let r = {
    //   debug:debug,
    //   url:`/rooms/${room.uid}`,
    //   params:{me:this._appstate.get('me').id}
    // };
    // this._io.socket.put(`/rooms/${room.id}`, JSON.stringify(room))
    //   .map(response => response.json()).subscribe(data => {
    //     this.dataStore.messages.forEach((todo, i) => {
    //       if (todo.id === data.id) { this.dataStore.messages[i] = data; }
    //     });
    //
    //     this._messages$.next(this.dataStore.messages);
    //   }, error => console.log('Could not update room.'));
  }

  remove(roomId: number) {
    return alert('not implemented');
    // this._io.socket.delete(`/rooms/${roomId}`).subscribe(response => {
    //   this.dataStore.messages.forEach((t, i) => {
    //     if (t.id === todoId) { this.dataStore.messages.splice(i, 1); }
    //   });
    //
    //   this._messages$.next(this.dataStore.messages);
    // }, error => console.log('Could not delete room.'));
  }
}
