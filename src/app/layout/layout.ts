import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Subscription, filter } from 'rxjs';
import { ToolbarRoutes } from '../models';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [
    MenubarModule,
    BadgeModule,
    InputTextModule,
    CommonModule,
    ButtonModule,
    AvatarModule,
    RouterOutlet,
  ],
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
  themeIcon = signal<string>('pi pi-sun');
  userAvatar = signal<string>('U');
  private readonly router = inject(Router);
  protected showToolbar: boolean = false;
  private navigationSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.DisplayToolbar();
    this.applyTheme();
    this.authService.user$.subscribe((user) => {
      this.userAvatar.set(
        `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? 'U'}`.toUpperCase(),
      );
    });
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

    if (this.themeIcon() === 'pi pi-sun') {
      this.themeIcon.set('pi pi-moon');
    } else {
      this.themeIcon.set('pi pi-sun');
    }
  }

  private applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const element = document.querySelector('html');
    const isDarkMode = savedTheme === 'dark';

    element?.classList.toggle('dark-theme', isDarkMode);

    this.themeIcon.set(isDarkMode ? 'pi pi-moon' : 'pi pi-sun');
  }
}
