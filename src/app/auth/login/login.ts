export class LoginModel {
  constructor(
    public identifier:string,
    public password:string,
    public autoLogin:boolean
  ){}
}
