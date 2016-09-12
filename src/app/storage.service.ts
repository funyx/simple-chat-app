import { Injectable } from '@angular/core';

@Injectable()
export class Storage {
  constructor(){
  }
  save(id,obj){
    var duplicate = Object.assign({}, obj)
    localStorage.setItem(`${id}`, JSON.stringify(duplicate));
  }

  get(id){
    return JSON.parse(localStorage.getItem(`${id}`));
  }
}
