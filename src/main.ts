import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {
  enableProdMode,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withHashLocation } from '@angular/router';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app/app.routes';
import { HttpConfigInterceptor } from './app/interceptors/httpConfig.interceptor';
import { AmberPreset } from './styles/presets/preset.amber';
import { APP_BASE_HREF } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: AmberPreset,
        options: {
          darkModeSelector: '.dark-theme',
        },
      },
    }),
    provideRouter(routes),
    { provide: APP_BASE_HREF, useValue: '/beer-shop-ai-frontend/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
  ],
}).catch((err) => console.error(err));
