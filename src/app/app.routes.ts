import { Routes } from '@angular/router';
import { App } from './app';
import { STORES_ROUTES } from './stores/store-routes';
import { StoreLayout } from './stores/layouts/store-layout/store-layout';

export const routes: Routes = [
  {
    path: 'stores',
    component: StoreLayout,
    children: [...STORES_ROUTES],
  },
  {
    path: '**',
    redirectTo: 'stores',
    pathMatch: 'full',
  },
];
