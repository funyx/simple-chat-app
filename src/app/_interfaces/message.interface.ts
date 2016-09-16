import { Room } from './room.interface';
import { User } from './user.interface';

export interface Messages {
  id:number;
  roomUid:string;
  uid:Room;
  author:User;
  content:string;
  createdAt:string;
  updatedAt:string;
}
