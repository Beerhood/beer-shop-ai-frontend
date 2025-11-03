import { Component, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { Layout } from './layout/layout';

@Component({
  selector: 'app-root',
  imports: [ToastModule, Layout],
  template: `<p-toast position="bottom-center" /><app-layout />`,
  standalone: true,
})
export class AppComponent {}
