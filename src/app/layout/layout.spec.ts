import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Layout } from './layout';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, provideRouter, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePage } from '../home-page/home-page.component';
import { MenuPage } from '../menu-page/menu-page.component';
import { OrderPage } from '../order-page/order-page.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MessageService } from 'primeng/api';

describe('Layout', () => {
  let fixture: ComponentFixture<Layout>;
  let component: Layout;

  // Router mock
  const routerEvents$ = new Subject<any>();
  const routerMock = {
    url: '/home',
    events: routerEvents$.asObservable(),
  } as Partial<Router> as Router;

  // Auth mock (IMPORTANT: BehaviorSubject so Layout gets latest immediately)
  const user$ = new BehaviorSubject<any>(null);
  const authMock = {
    user$,
  } as Partial<AuthService> as AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout, RouterTestingModule], // standalone
      providers: [
        HttpClient,
        HttpHandler,
        MessageService,
        provideRouter([
          { path: 'home', component: HomePage },
          { path: 'menu', component: MenuPage },
          { path: 'order', component: OrderPage },
        ]),
        { provide: ActivatedRoute, useValue: { snapshot: {}, params: new Subject() } },
        { provide: AuthService, useValue: authMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    document.querySelector('html')?.classList.remove('dark-theme');
    localStorage.removeItem('theme');
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('does NOT show toolbar by default (before matching route event)', () => {
    fixture.detectChanges();
    const menubar = fixture.nativeElement.querySelector('p-menubar');
    expect(menubar).toBeFalsy();
  });

  it('shows toolbar after NavigationEnd when route matches ToolbarRoutes regexp', async () => {
    const router = TestBed.inject(Router);

    fixture.detectChanges(); // ngOnInit subscribes to router.events

    await router.navigateByUrl('/home'); // emits NavigationEnd
    fixture.detectChanges();

    expect((component as any).showToolbar).toBeTrue();
    expect(fixture.debugElement.query(By.css('p-menubar'))).toBeTruthy();
  });

  it('hides toolbar when route does NOT match ToolbarRoutes regexp', () => {
    (routerMock as any).url = '/some-random-route';
    fixture.detectChanges();

    routerEvents$.next(new NavigationEnd(1, '/some-random-route', '/some-random-route'));
    fixture.detectChanges();

    const menubar = fixture.nativeElement.querySelector('p-menubar');
    expect(menubar).toBeFalsy();
  });

  it('renders router-outlet', () => {
    fixture.detectChanges();
    const outlet = fixture.nativeElement.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });

  it('sets default avatar to "U" when user is null/undefined', () => {
    fixture.detectChanges();
    user$.next(null);
    fixture.detectChanges();

    expect(component.userAvatar()).toBe('U');
  });

  it('sets avatar to initials from user$', () => {
    // emit user before init OR right after init (both work with BehaviorSubject)
    user$.next({ firstName: 'Max', lastName: 'Kurenkov' });

    fixture.detectChanges(); // runs ngOnInit subscription
    expect(component.userAvatar()).toBe('MK');
  });

  it('applyTheme(): uses localStorage theme=dark -> adds class and sets icon', () => {
    localStorage.setItem('theme', 'dark');

    fixture.detectChanges(); // ngOnInit -> applyTheme

    const html = document.querySelector('html')!;
    expect(html.classList.contains('dark-theme')).toBeTrue();
    expect(component.themeIcon()).toBe('pi pi-moon');
  });

  it('toggleDarkMode(): toggles html class, localStorage, and theme icon', () => {
    localStorage.setItem('theme', 'light');
    fixture.detectChanges();

    const html = document.querySelector('html')!;
    expect(html.classList.contains('dark-theme')).toBeFalse();
    expect(component.themeIcon()).toBe('pi pi-sun');

    component.toggleDarkMode();
    fixture.detectChanges();

    expect(html.classList.contains('dark-theme')).toBeTrue();
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(component.themeIcon()).toBe('pi pi-moon');

    component.toggleDarkMode();
    fixture.detectChanges();

    expect(html.classList.contains('dark-theme')).toBeFalse();
    expect(localStorage.getItem('theme')).toBe('light');
    expect(component.themeIcon()).toBe('pi pi-sun');
  });

  it('when toolbar is visible, has Search input and cart link', async () => {
    const router = TestBed.inject(Router);

    fixture.detectChanges();

    await router.navigateByUrl('/menu');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input[placeholder="Search"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('a[href="/order"]')).toBeTruthy();
  });
});
