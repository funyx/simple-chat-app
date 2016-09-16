import { Home } from '../home/home.component';
import { Welcome } from '../home/welcome/welcome.component';
import { Room } from '../home/room/room.component';

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
        component: Room
      }
    ]
  }
];
