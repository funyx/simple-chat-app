import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PromiseObservable } from 'rxjs/Observable/PromiseObservable';
import { AppState } from '../../../app.service';
import { RoomsService } from '../../rooms.service';
import { appRoom } from '../../../_models/appRoom';
import { appUser } from '../../../_models/appUser';
import { appMessages } from '../../../_models/appMessages';

@Component({
  selector: 'chat-body',
  encapsulation: ViewEncapsulation.None,
  styles:[`
    chat-body{
      position:absolute;
      bottom:0px;
      height: 100%;
      width: 100%;
    }
    .chat-thread{
      margin: 5.5rem auto 7rem;
      position: relative;
      bottom: 0px;
    }
    .chat-tread-wrapper{
      position: absolute;
      width: 100%;
      max-height: 100%;
      overflow: auto;
      right: 0px;
      bottom: 0px;
    }
  `],
  template: `
  <div class="chat-tread-wrapper">
    <ul class="chat-thread">
    	<li
        *ngFor="let m of messages"
        [ngClass]="{'me': m.amI(me.id),'not-me': !m.amI(me.id) }"
        >{{m.content}}</li>
    </ul>
  </div>
  `
})
// export interface appMessages{
//   id:number;
//   roomUid:string;
//   uid:string;
//   author:string;
//   content:string;
//   createdAt:string;
//   updatedAt:string;
// }
export class chatBody implements OnInit {
  public messages : appMessages[];
  public me : appUser;
  constructor(
    private _app : AppState,
    private _activeroute : ActivatedRoute,
    private _rooms : RoomsService
  ){
    this.messages = [];
    this.me = new appUser(this._app.get('me'));
  }
  ngOnInit(){
    this._activeroute.params
      .map(params => params['uid'])
      .subscribe((uid) => {
        this._rooms.loadRoom(uid)
        .then((data:any)=>{
          console.log(this.messages);
          if(data.length){
            for(var i in data){
              this.messages.push(new appMessages(data));
            }
          }
        },(err)=>{
          console.log('err',err);
        })
      });
  }
}
