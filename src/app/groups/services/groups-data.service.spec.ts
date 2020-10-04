import { TestBed } from '@angular/core/testing';

import { GroupsDataService } from './groups-data.service';

describe('GroupsDataService', () => {
  let service: GroupsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
