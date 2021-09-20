import db from '../Connection';
import type { Card, Id } from '../types';


const getAll = async (): Promise<Card[]> => db
  ? await db.cards.toArray()
  : Promise.resolve([]);

const create = async (card: Card): Promise<Id> => db
  ? await db.cards.add(card)
  : Promise.resolve(null);

const update = async (card: Card): Promise<Id> => db
  ? await db.cards.update(card.id, card)
  : Promise.resolve(null);

const remove = async (cardId: Id): Promise<Id> => db
  ? await db.cards.delete(cardId)
  : Promise.resolve(null);

const get = async (cardId: Id): Promise<Card> => db
  ? await db.cards.get(cardId)
  : Promise.resolve(null);

const onUpdate = (subscriber: () => void) => {
  if (!db) {
    return;
  }
  db.cards.hook('creating', subscriber);
  db.cards.hook('updating', subscriber);
  db.cards.hook('deleting', subscriber);
};

export default {
  get,
  getAll,
  create,
  update,
  remove,
  onUpdate
};
