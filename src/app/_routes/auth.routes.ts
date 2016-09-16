import { Auth } from '../auth/auth.component';
import { Login } from '../auth/login/login.component';
import { Register }   from '../auth/register/register.component';
import { Welcome } from '../auth/welcome/welcome.component';

export const routes = [
  {
    path: '',
    component: Auth,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'welcome',
        component: Welcome
      },
      {
        path: 'register',
        component: Register
      }
    ]
  }
];

// export const authRouting: ModuleWithProviders = RouterModule.forChild(authRoutes);
