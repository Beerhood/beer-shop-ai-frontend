import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Subscription, filter } from 'rxjs';
import { ToolbarRoutes } from '../models';

@Component({
  selector: 'app-layout',
  imports: [MenubarModule, BadgeModule, InputTextModule, CommonModule, ButtonModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/home',
    },
    {
      label: 'Menu',
      icon: 'pi pi-clipboard',
      routerLink: '/menu',
    },
  ];
  icon = signal<string>('pi pi-sun');
  private readonly router = inject(Router);
  protected showToolbar: boolean = false;
  private navigationSubscription: Subscription | undefined;

  ngOnInit() {
    this.DisplayToolbar();
    this.applyTheme();
  }

  DisplayToolbar() {
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.url.split('?')[0];
        const toolbarRoutes = Object.values(ToolbarRoutes);
        const toolbarRoutesRexExp = new RegExp(`/${toolbarRoutes.join('|')}/*`);
        this.showToolbar = toolbarRoutesRexExp.test(currentRoute);
      });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    const isDarkMode = element?.classList.contains('dark-theme');
    element?.classList.toggle('dark-theme', !isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');

    if (this.icon() === 'pi pi-sun') {
      this.icon.set('pi pi-moon');
    } else {
      this.icon.set('pi pi-sun');
    }
  }

  private applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const element = document.querySelector('html');
    const isDarkMode = savedTheme === 'dark';

    element?.classList.toggle('dark-theme', isDarkMode);

    this.icon.set(isDarkMode ? 'pi pi-moon' : 'pi pi-sun');
  }
}
