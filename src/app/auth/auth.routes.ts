// import { ModuleWithProviders }   from '@angular/core';
// import { Routes, RouterModule }  from '@angular/router';

import { Auth } from './auth.component';
import { Login } from './login/login.component';
import { Register }   from './register/register.component';
import { Welcome } from './welcome/welcome.component';

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
