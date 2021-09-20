import Dexie from 'dexie';
import Schema from './Schema';
import type { Card, CardsTopics, Id, Topic } from './types';
// @ts-ignore
import { browser } from '$app/env';


class DataBase extends Dexie {
  cards: Dexie.Table<Card, Id>;
  topics: Dexie.Table<Topic, Id>;
  cardsTopics: Dexie.Table<CardsTopics, Id>;

  constructor() {
    super('memory-cards');
    this.version(1).stores(Schema);
    this.cards = this.table('cards');
    this.topics = this.table('topics');
    this.cardsTopics = this.table('cardsTopics');
  }
}


const db: DataBase | false = browser ? new DataBase() : false;

export default db;
