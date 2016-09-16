import { Room } from '../_interfaces/room.interface';
import { appUser } from './appUser';

export class appRoom implements Room {
  public id: number;
  public name: string;
  public uid: string;
  public createdAt: any;
  public updatedAt: any;
  public participants: string;
  public users: appUser[];
  private me;
  constructor(
    room_data : any,
    me : appUser
  ){
    this.id = room_data.id;
    this.name = room_data.name || '';
    this.uid = room_data.uid;
    this.users = room_data.users;
    this.participants = room_data.participants;
    this.createdAt = room_data.createdAt;
    this.updatedAt = room_data.updatedAt;
    this.me = me;
  }
  public compare_users_arrays(users1:number[],users2:number[]){
    if(users1.length != users2.length)return false;
    return users1.sort().join(',') === users2.sort().join(',');
  }
  public users_wo_me(){
    let u = this.users;
    let found_u : appUser[] = [];
    for(var i in u){
      if(u[i].id != this.me.id) found_u.push(u[i]);
    }
    return found_u;
  }
  public title(){
    if(this.name!='')return this.name;
    let u : any[] = this.users_wo_me();
    let title : string = '';
    for(let i=0; i<u.length;i++){
      title += u[i].public_name;
      if(i<u.length-1) title += ', ';
    }
    return title;
  }
}
