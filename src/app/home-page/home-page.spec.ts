import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map()),
            queryParamMap: of(new Map()),
            snapshot: {
              paramMap: new Map(),
              queryParamMap: new Map(),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders hero title', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1?.textContent).toContain('BeerHood');
  });

  it('renders hero subtitle', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2?.textContent).toContain('Real craft without compromise');
  });

  it('renders hero image', () => {
    const img: HTMLImageElement | null = fixture.nativeElement.querySelector(
      'img[alt="Craft Beer Atmosphere"]',
    );

    expect(img).toBeTruthy();
    expect(img!.getAttribute('src')).toBe('/assets/images/craft-beer.jpg');
  });

  it('renders "Powered by AI" section', () => {
    expect(fixture.nativeElement.textContent).toContain('Powered by');
    expect(fixture.nativeElement.textContent).toContain('AI');
  });

  it('renders all feature titles and descriptions from features[]', () => {
    for (const f of component.features) {
      expect(fixture.nativeElement.textContent).toContain(f.title);
      expect(fixture.nativeElement.textContent).toContain(f.desc);
    }
  });

  it('AI button navigates to /ai-chat', () => {
    const aiBtn = fixture.debugElement
      .queryAll(By.css('a'))
      .find((el) => (el.nativeElement.textContent ?? '').includes('Try AI Sommelier'));

    expect(aiBtn).toBeTruthy();

    aiBtn!.injector.get<any>(By.directive((aiBtn as any).providerTokens?.[0]) as any, null);
    expect(aiBtn!.attributes['routerLink']).toBe('/ai-chat');
  });

  it('Menu button navigates to /menu', () => {
    const menuBtn = fixture.debugElement
      .queryAll(By.css('a'))
      .find((el) => (el.nativeElement.textContent ?? '').includes('Go to Menu'));

    expect(menuBtn).toBeTruthy();
    expect(menuBtn!.attributes['routerLink']).toBe('/menu');
  });

  it('renders image-compare images', () => {
    const sad: HTMLImageElement | null = fixture.nativeElement.querySelector(
      'img[alt="Sad without beer"]',
    );
    const happy: HTMLImageElement | null = fixture.nativeElement.querySelector(
      'img[alt="Happy with beer"]',
    );

    expect(sad).toBeTruthy();
    expect(happy).toBeTruthy();
    expect(sad!.getAttribute('src')).toBe('/assets/images/sad-man.png');
    expect(happy!.getAttribute('src')).toBe('/assets/images/happy-man-with-beer.png');
  });

  it('renders Contacts section and links only where isLink=true', () => {
    expect(fixture.nativeElement.textContent).toContain('Contacts');

    const phoneLink: HTMLAnchorElement | null =
      fixture.nativeElement.querySelector('a[href^="tel:"]');
    expect(phoneLink).toBeTruthy();
    expect(phoneLink!.getAttribute('href')).toBe('tel:380674210242');

    const mailLink: HTMLAnchorElement | null =
      fixture.nativeElement.querySelector('a[href^="mailto:"]');
    expect(mailLink).toBeTruthy();
    expect(mailLink!.getAttribute('href')).toBe('mailto:info@beerhood.com');

    expect(fixture.nativeElement.textContent).toContain(
      'Kyiv region, s. Tomashivka, str. Lesi Ukrainky, 1',
    );
  });

  it('renders timeline statuses from timelineEvents[]', () => {
    for (const e of component.timelineEvents) {
      expect(fixture.nativeElement.textContent).toContain(e.status);
      expect(fixture.nativeElement.textContent).toContain(e.description);
    }
  });
});
