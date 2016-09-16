import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './no-content';
import { AuthGuard } from './auth.guard';
import { AuthModule }  from './auth';
import { HomeModule } from './home';
import { DataResolver } from './app.resolver';


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
