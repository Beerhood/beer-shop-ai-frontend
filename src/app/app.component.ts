import { Component, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { Layout } from './layout/layout';

@Component({
  selector: 'app-root',
  imports: [ToastModule, Layout],
  template: `<p-toast position="top-right" /><app-layout />`,
  standalone: true,
})
export class AppComponent {}
