import { appRoom } from './appRoom';
import { appUser } from './appUser';

import { Message } from '../_interfaces/message.interface';

export class appMessage implements Message {
  public id : number;
  public room : appRoom;
  public uid : string;
  public author : appUser;
  public content : string;
  public createdAt : string;
  public updatedAt : string;
  public me: appUser;
  constructor (message_data,me:appUser) {
    this.id = message_data.id;
    this.room = message_data.room || '';
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
}
