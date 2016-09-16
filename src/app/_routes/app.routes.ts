import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_services/auth.guard';

import { AuthModule }  from '../auth';
import { HomeModule } from '../home';

import { NoContent } from '../no-content';


export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/auth/welcome',
    pathMatch: 'full'
  },
  { path: 'auth', loadChildren: () => AuthModule },
  { path: 'home',  loadChildren: () => HomeModule, canActivate: [AuthGuard]},
  { path: '**',    component: NoContent },
];
