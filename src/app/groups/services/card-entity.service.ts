import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { Card, cardEntityName } from '../models/card.model';

@Injectable()
export class CardEntityService extends EntityCollectionServiceBase<Card> {
  constructor(protected readonly serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(cardEntityName, serviceElementsFactory);
  }
}
