import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { Group, groupEntityName } from '../models/group.model';

@Injectable()
export class GroupEntityService extends EntityCollectionServiceBase<Group> {
  constructor(protected readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(groupEntityName, serviceElementsFactory);
  }
}
