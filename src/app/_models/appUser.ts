import { User } from '../_interfaces/user.interface';

export class appUser implements User {
  public id:number;
  public username:string;
  public email:string;
  public public_name:string;
  public timezone:string;
  public avatar:string;
  public is_online:boolean;
  constructor(user_data){
    this.id = user_data.id;
    this.username = user_data.username || 'Anonymous';
    this.email = user_data.email || 'Private';
    this.public_name = user_data.public_name || this.username;
    this.timezone = user_data.timezone || '';
    this.avatar = user_data.avatar || '';
    this.is_online = user_data.is_online || false;
  }
}
