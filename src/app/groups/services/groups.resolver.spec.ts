import { TestBed } from '@angular/core/testing';

import { GroupsResolver } from './groups.resolver';

describe('GroupsService', () => {
  let service: GroupsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
