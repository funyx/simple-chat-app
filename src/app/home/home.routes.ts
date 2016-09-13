
import { Home } from './home.component';
import { Welcome } from './welcome/welcome.component';

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
      }
    ]
  }
];
