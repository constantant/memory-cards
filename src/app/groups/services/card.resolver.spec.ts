import { TestBed } from '@angular/core/testing';

import { CardResolver } from './card.resolver';

describe('CardService', () => {
  let service: CardResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
