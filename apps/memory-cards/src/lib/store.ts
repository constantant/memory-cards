import type { Observable } from 'rxjs';
import { concat, of, shareReplay, Subject, switchMap } from 'rxjs';

import type { Card, Id } from './datastore/types';
import { CardsStore } from './datastore';

interface FilterQuery {
  query?: string;
  topicIds?: Id[];
}

const triggerUpdate: Subject<void> = new Subject<void>();
export const cards: Observable<Card[]> = concat(of(void 0), triggerUpdate).pipe(
  switchMap(() => CardsStore.getAll()),
  shareReplay(1)
);

export const create = async (card: Card) => {
  const newId = await CardsStore.create(card);
  triggerUpdate.next();
  return newId;
};

export const update = async (card: Card) => {
  await CardsStore.update(card);
  triggerUpdate.next();
  return card.id;
};
export const remove = async (cardId: Id) => {
  await CardsStore.remove(cardId);
  triggerUpdate.next();
  return cardId;
};
