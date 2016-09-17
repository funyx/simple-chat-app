import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { appRoom } from '../../../_models/appRoom';
import { appUser } from '../../../_models/appUser';

@Component({
  selector: 'room-header',
  encapsulation: ViewEncapsulation.None,
  styles: [`
  room-header{
    background: rgba(0,0,0,0.75);
    width: 100%;
    height: 3rem;
    position: absolute;
    color:white;
  }
  .room-header>p{
    padding: 0.7rem;
  }
  `],
  template: '<div class="room-header"><p>{{room.title()}}</p></div>'
})
export class roomHeader implements OnInit{
  @Input() room: appRoom;
  @Input() me: appUser;
  constructor(
  ){
  }
  ngOnInit(){
    console.log(this.room,this.me);
  }
}
