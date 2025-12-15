import 'zone.js';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Layout } from './layout/layout';
import { By } from '@angular/platform-browser';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, Layout],
      providers: [MessageService, HttpClient, HttpHandler, provideAnimations],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render layout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const appLayoutElement = fixture.debugElement.query(By.css('app-layout'));
    expect(appLayoutElement).toBeTruthy();
  });
});
