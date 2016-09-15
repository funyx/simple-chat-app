import { appRoom } from './appRoom';
import { appUser } from './appUser';

export class appMessages {
  public id;
  public roomUid;
  public uid : appRoom;
  public author : appUser;
  public content;
  public createdAt;
  public updatedAt;
  constructor (message_data) {
    this.id = message_data.id;
    this.roomUid = message_data.roomUid || '';
    this.uid = message_data.uid || '';
    this.author = message_data.author || '';
    this.content = message_data.content || '';
    this.createdAt = message_data.createdAt || Date.now();
    this.updatedAt = message_data.updatedAt || Date.now();
  }
  amI(id){
    return id === this.id;
  }
}
