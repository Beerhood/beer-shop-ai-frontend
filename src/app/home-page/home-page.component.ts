import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ImageCompareModule } from 'primeng/imagecompare';
import { TimelineModule } from 'primeng/timeline';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardModule,
    ButtonModule,
    ImageCompareModule,
    TimelineModule,
    DividerModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePage {
  features = [
    { 
      title: 'Smart Choice', 
      icon: 'pi-compass', 
      desc: "Don't know what to choose? Our built-in AI analyzes your preferences to suggest the perfect match." 
    },
    { 
      title: 'Food Pairing', 
      icon: 'pi-comments', 
      desc: "Planning dinner? Tell the AI what you're eating, and it will find the beverage that enhances every bite." 
    },
    { 
      title: 'Always Learning', 
      icon: 'pi-sync', 
      desc: "The more you interact, the better it gets. We remember your favorites to make every order better." 
    }
  ];

  contacts = [
    { 
      title: 'Phone', 
      icon: 'pi-phone', 
      value: '+38 067 42 102 42', 
      link: 'tel:380674210242',
      isLink: true 
    },
    { 
      title: 'Address', 
      icon: 'pi-map-marker', 
      value: 'Kyiv region, s. Tomashivka, str. Lesi Ukrainky, 1', 
      isLink: false 
    },
    { 
      title: 'Email', 
      icon: 'pi-envelope', 
      value: 'info@beerhood.com', 
      link: 'mailto:info@beerhood.com',
      isLink: true 
    }
  ];

  timelineEvents = [
    {
      status: 'Boredom',
      description: 'Standard boring evening',
      icon: 'pi pi-face-smile',
      color: 'var(--p-surface-400)',
    },
    {
      status: 'Idea',
      description: 'Asking AI for advice',
      icon: 'pi pi-bolt',
      color: 'var(--p-primary-500)',
    },
    {
      status: 'Order',
      description: 'Quick delivery',
      icon: 'pi pi-shopping-cart',
      color: 'var(--p-primary-500)',
    },
    {
      status: 'Happiness',
      description: 'Enjoying craft beer',
      icon: 'pi pi-sparkles',
      color: 'var(--p-primary-500)',
    },
  ];
}
