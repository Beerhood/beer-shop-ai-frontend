import { Routes } from '@angular/router';
import { MenuPage } from 'src/app/menu-page/menu-page.component';

export default [
  { path: '', component: MenuPage },
  {
    path: ':id',
    component: MenuPage,
  },
] as Routes;
