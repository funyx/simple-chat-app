import { appUser } from './appUser';

export class appRoom {
  public id ;
  public name;
  public uid;
  public createdAt;
  public updatedAt;
  public users: appUser[];
  constructor(room_data){
    this.id = room_data.id;
    this.name = room_data.name || '';
    this.uid = room_data.uid;
    this.users = room_data.users;
    this.createdAt = room_data.createdAt;
    this.updatedAt = room_data.updatedAt;
  }
  public compare_users_arrays(users1:number[],users2:number[]){
    if(users1.length != users2.length)return false;
    return users1.sort().join(',') === users2.sort().join(',');
  }
  public get_users_array_by_uid(uid){
    let u = this.users;
    let found_u : number[] = [];
    for(var i in u){
      found_u.push(parseInt(u[i].id));
    }
    return found_u;
  }
  public get_uid_by_users_array(users){
    let u = this.users;
    let found_u : number[] = [];
    for(var i in u){
      found_u.push(parseInt(u[i].id));
    }
    return users.sort().join(',') === found_u.sort().join(',')?this.uid:false;
  }
  public users_wo_me(me){
    let u = this.users;
    let found_u : appUser[] = [];
    for(var i in u){
      if(u[i].id != me) found_u.push(u[i]);
    }
    return found_u;
  }
  public title(me){
    if(this.name!='')return this.name;
    let u : any[] = this.users_wo_me(me);
    let title : string = '';
    for(let i=0; i<u.length;i++){
      title += u[i].public_name;
      if(i<u.length-1) title += ', ';
    }
    return title;
  }
}
