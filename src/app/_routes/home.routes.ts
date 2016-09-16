import { Home } from '../home/home.component';
import { Welcome } from '../home/welcome/welcome.component';
import { Chat } from '../home/chat/chat.component';

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
        path: 'chat/:uid',
        component: Chat
      }
    ]
  }
];
