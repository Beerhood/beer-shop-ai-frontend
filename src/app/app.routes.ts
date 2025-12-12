import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.routes'),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth-page/auth-page.routes'),
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu-page/menu-page.routes'),
  },
  {
    path: 'order',
    loadChildren: () => import('./order-page/order-page.routes'),
  },
  {
    path: 'ai-chat',
    loadChildren: () => import('./ai-chat/ai-chat.routes'),
  },
  {
    path: 'sorry',
    loadComponent: () => import('./sorry-page/sorry-page.component').then((c) => c.SorryPage),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then((c) => c.NotFoundPage),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
