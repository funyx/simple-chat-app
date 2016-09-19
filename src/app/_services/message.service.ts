import { Injectable, ApplicationRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { AppState } from './app.service';
import { Io, SocketRequest, SocketResponse } from './socket.service';

import { appMessage } from '../_models/appMessage';
import { appRoom } from '../_models/appRoom';
import { appUser } from '../_models/appUser';

@Injectable()
export class MessageService {
  public _messages$: Subject<appMessage[]>;
  private _messages_count$: Subject<number>;
  private me : appUser;
  private dataStore: {
    messages: appMessage[],
    messages_count: number
  };

  constructor(
    private _io: Io,
    private _appstate: AppState,
    private _ref: ApplicationRef
  ) {
    this.dataStore = { messages: [],messages_count: 0 };
    this.me = new appUser(this._appstate.get('me'));
    this._messages$ = <Subject<appMessage[]>>new Subject();
    this._messages_count$ = <Subject<number>>new Subject();
  }

  get messages$() {
    return this._messages$.asObservable();
  }
  get messages_count$() {
    return this._messages_count$.asObservable();
  }

  loadAll(uid:'string',debug:boolean=false) {
    let r = {
      debug : debug,
      url : `/rooms/${uid}/messages`,
      params : { me : this.me.id }
    };
    this._io.request$(new SocketRequest(r))
    .map(res => new SocketResponse(res).body.data)
    .subscribe(
      (data : appMessage[]) => {
        this.dataStore.messages = [];
        data.forEach((message,index)=>{
          if(message.id) this.dataStore.messages.push(new appMessage(message,this.me));
        });
        this._messages_count$.next(this.dataStore.messages.length);
        this._messages$.next(this.dataStore.messages);
        // this._messages$.complete();
      },
      error => console.log(`Can't load room messages!`),
      // FUCKIN DIGEST THIS SHIT !!!!
      () => this._ref.tick()//this._ref.tick();}
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
          this._messages_count$.next(this.dataStore.messages.length);
          this._messages$.next(this.dataStore.messages);
          this._messages$.complete();
          this._ref.tick();
        },
        error => console.log(`Can't load room message!`),
        // FUCKIN DIGEST THIS SHIT !!!!
        ()=>{return}
      );
  }

  create(room: appMessage,debug:boolean=false) {
    let data = room.baseData();
    let r = {
      debug:debug,
      url:`/rooms/${data.roomUid}/messages`,
      params:data,
      method:'post'
    };
    this._io.request$(new SocketRequest(r))
      .map(res => new SocketResponse(res).body.data)
      .subscribe(
        (message : appMessage) => {
          let notFound = true;
          this.dataStore.messages.forEach((item, index) => {
            if (item.uid === message.uid) {
              this.dataStore.messages[index] = new appMessage(message,this.me);
              notFound = false;
            }
          });
          if (notFound) {
            console.log('the new message is :',new appMessage(message,this.me));
            this.dataStore.messages.unshift(new appMessage(message,this.me));
          }
          this._messages_count$.next(this.dataStore.messages.length);
          this._messages$.next(this.dataStore.messages);
          this._messages$.complete();
          this._ref.tick();
        },
        error => console.log('Could not create message.'),
        // FUCKIN DIGEST THIS SHIT !!!!
        ()=>{return}
      );
  }

  update(room: appMessage,debug:boolean=false) {
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
