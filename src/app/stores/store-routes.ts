import { Routes } from '@angular/router';
import { StoreList } from './store-list/store-list';
import { StoreCreate } from './store-create/store-create';
import { StoreDelete } from './store-delete/store-delete';

export const STORES_ROUTES: Routes = [
  {
    path: '',
    component: StoreList,
  },
  {
    path: 'create',
    component: StoreCreate,
  },
  {
    path: 'delete',
    component: StoreDelete,
  },
];
