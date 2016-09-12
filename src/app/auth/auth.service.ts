import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(){
    console.log('im fired');
  }
  login(identifier: string, password: string, autoLogin: boolean) {
    return console.log('identifier',identifier, 'password',password, 'autoLogin', autoLogin);
  }

  autoLogin(identifier: string){
    alert('autoLogin');
  }

  register(username: string, email: string, password: string) {
    console.log('username',username,'email',email,'password',password);
  }

  save(id,obj){
    var duplicate = Object.assign({}, obj)
    localStorage.setItem(`${id}`, JSON.stringify(duplicate));
  }

  get(id){
    return JSON.parse(localStorage.getItem(`${id}`));
  }

  // addCrisis(name: string) {
    // name = name.trim();
    // if (name) {
    //   let crisis = new Crisis(CrisisService.nextCrisisId++, name);
    //   crisesPromise.then(crises => crises.push(crisis));
    // }
  // }
}
