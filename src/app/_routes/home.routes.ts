import { Home } from '../home/home.component';
import { Welcome } from '../home/welcome/welcome.component';
import { Room } from '../home/room/room.component';
import { RoomResolver } from '../_resolvers/room.resolver';

export const routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
      },
      {
        path: 'welcome',
        component: Welcome
      },
      {
        path: 'room/:uid',
        component: Room,
        resolve: { room: RoomResolver }
      }
    ]
  }
];
