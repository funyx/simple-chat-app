import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';

import { RoomService } from '../_services/room.service';
import { appRoom } from '../_models/appRoom';

@Injectable()
export class RoomResolver implements Resolve<Observable<appRoom>> {

    constructor(
        private service: RoomService
    ) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<appRoom>|any {
        let uid = route.params['uid'];

        let observable = this.service.rooms$
          .map(rooms => rooms.find(room => room.uid === uid)).take(1);
        this.service.load(uid);
        return observable;
    }
}
