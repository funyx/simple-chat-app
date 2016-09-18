import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toArray';

import { MessageService } from '../_services/message.service';
import { appMessage } from '../_models/appMessage';

@Injectable()
export class RoomMessagesResolver implements Resolve<Observable<appMessage[]>> {

    constructor(
        private service: MessageService
    ) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<appMessage[]> {
        let uid = route.params['uid'];

        let observable = this.service.messages$;
        this.service.loadAll(uid);
        return observable;
    }
}
