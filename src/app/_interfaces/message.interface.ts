import { Room } from './room.interface';
import { User } from './user.interface';

export interface Message {
  id:number;
  room:Room;
  uid:string;
  author:User;
  content:string;
  createdAt:string;
  updatedAt:string;
}
