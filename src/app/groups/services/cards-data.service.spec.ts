import { TestBed } from '@angular/core/testing';

import { CardsDataService } from './cards-data.service';

describe('CardDataService', () => {
  let service: CardsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
