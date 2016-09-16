import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';

import { AppState } from '../../_services/app.service';
import { RoomService } from '../../_services/room.service';
import { Storage } from '../../_services/storage.service';
import { UsersService } from '../../_services/users.service';

import { appRoom } from '../../_models/appRoom';
import { appUser } from '../../_models/appUser';
import { SidebarModel } from './sidebar';

@Component({
  selector: 'sidebar',
  styleUrls: [
    './sidebar.style.css'
  ],
  templateUrl:'./sidebar.component.html',
})

export class Sidebar implements OnInit, OnDestroy {
  public me;
  public users_online;
  public rooms : appRoom[] = [];
  constructor(
    private _rooms: RoomService,
    private _router: Router,
    private _storage: Storage,
    private _users: UsersService,
    private _state: AppState
  ) {
    let state_rooms : any[] = this._state.get('rooms');
    for(let i in state_rooms){
      this.rooms.push(new appRoom(state_rooms[i]));
    }
    this.me = new appUser(this._storage.get('me'));
    this._users.get_online(this.me.username)
        .then((res:any[])=>{
          let others:any[] = [];
          if(res.length){
            for(var i in res){
              let user = new appUser(res[i]);
              if(user.id != this.me.id) others.push(user);
            }
          }
          this.users_online = others||res;
      },(err)=>{
        console.log(err);
    });
  }
  public startChat(vars:any[]){
    let active_chat : any = false;
    let uid : any = false;
    for(let i in this.rooms){
      let q = this.rooms[i].get_uid_by_users_array(vars);
      if(q){
        active_chat = this.rooms[i];
        uid = q;
      }
    }
    if(uid){
      this._state.set('active_chat',active_chat);
      this._router.navigate([`/home/chat/${uid}`]);
    }else{
      this._rooms.initRoom(vars)
      .then((res:any)=>{
        this._state.set('active_chat',Object.assign({},res));
        this._router.navigate([`/home/chat/${res.uid}`]);
      },(err)=>{
        console.log('err',err);
      })
    }
  }
  ngOnInit(){}
  ngOnDestroy(){}
}
