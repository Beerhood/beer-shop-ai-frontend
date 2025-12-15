import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from './card';
import { ProductTypes } from 'src/utils/enums';

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    component.product = {
      _id: '3456789y5u67',
      title: 'Lvivske Rizdvyane 0,5 l',
      image: 'https://picsum.photos/350/168',
      description:
        "'Lvivske Rizdvyane' is a dark beer with a caramel-spicy aroma and a hint of Christmas spices, which is brewed for the winter holidays. According to legend, Lviv brewers have long been treating guests who came to sing carols during holidays. This beer is available only in winter. Produced in package format: Glass Bottle 0,5L; CAN 0,48L; PET 1,12L; KEG 30L.",
      type: {
        _id: '3456784268u6746',
        name: 'Dark flavored beer',
        productType: ProductTypes.BEER,
      },
      price: 40.8,
      productType: ProductTypes.BEER,
      brand: 'Carlsberg group',
      country: 'Ukraine',
      details: {
        ABV: 4.2,
        OG: 1.01,
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
