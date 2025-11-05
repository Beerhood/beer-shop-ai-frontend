import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout',
  imports: [MenubarModule, BadgeModule, InputTextModule, CommonModule, ButtonModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  items: MenuItem[] | undefined;
  icon = signal<string>('pi pi-sun');

  ngOnInit() {
    this.items = [
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
    this.applyTheme();
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
