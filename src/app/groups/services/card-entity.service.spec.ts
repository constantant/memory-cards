import { TestBed } from '@angular/core/testing';

import { CardEntityService } from './card-entity.service';

describe('CardEntityService', () => {
  let service: CardEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
