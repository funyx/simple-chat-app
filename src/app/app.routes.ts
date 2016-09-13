import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';
import { AuthGuard } from './auth.guard';
import { AuthModule }  from './auth';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/auth/welcome',
    pathMatch: 'full'
  },
  { path: 'auth', loadChildren: () => AuthModule },
  { path: 'home',  component: Home, canActivate: [AuthGuard]},
  { path: 'about', component: About },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },
  { path: '**',    component: NoContent },
];
