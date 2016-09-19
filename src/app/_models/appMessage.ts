import { appRoom } from './appRoom';
import { appUser } from './appUser';

import { Message } from '../_interfaces/message.interface';

export class appMessage implements Message {
  public id : number;
  public room : appRoom;
  public roomUid : string;
  public uid : string;
  public author : appUser;
  public content : string;
  public createdAt : string;
  public updatedAt : string;
  public me: appUser;
  constructor (message_data:any,me:appUser) {
    this.id = message_data.id;
    this.room = message_data.room || '';
    this.roomUid = message_data.roomUid || '';
    this.uid = message_data.uid || '';
    this.author = message_data.author || '';
    this.content = message_data.content || '';
    this.createdAt = message_data.createdAt || Date.now();
    this.updatedAt = message_data.updatedAt || Date.now();
    this.me = me;
  }
  amI(){
    return this.me.id === this.author.id;
  }
  baseData(){
    return {
      id:this.id,
      room:this.room.id,
      roomUid:this.roomUid === ''?this.room.uid:'',
      uid:this.uid,
      author:this.author.id,
      content:this.content,
      createdAt:this.createdAt,
      updatedAt:this.updatedAt
    }
  }
}
