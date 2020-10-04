import { TestBed } from '@angular/core/testing';

import { CardsResolver } from './cards.resolver';

describe('CardsService', () => {
  let service: CardsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
