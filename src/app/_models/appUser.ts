export class appUser {
  public id;
  public username;
  public email;
  public public_name;
  public timezone;
  public avatar;
  public is_online;
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
