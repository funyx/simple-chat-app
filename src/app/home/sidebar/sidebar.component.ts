import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '../../storage.service';
import { UsersService } from '../../users.service';
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
  constructor(
    private _storage: Storage,
    private _users: UsersService
  ) {
    this.me = new appUser(this._storage.get('me'));
    this._users.get_online(this.me.username)
        .then((res)=>{
          this.users_online = res;
      },(err)=>{
        console.log(err);
    });
  }
  ngOnInit(){}
  ngOnDestroy(){}
}
