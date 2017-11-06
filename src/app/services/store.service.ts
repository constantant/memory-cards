import { EventEmitter, Injectable } from '@angular/core';
import { DbService } from './db.service';
import Dexie from 'dexie';

@Injectable()
export class StoreService {

  groups: IGroupItem[] = [];

  cardHasShown = false;

  currentGroupData: IFormGroupData;

  onCardChange: EventEmitter<number> = new EventEmitter();

  constructor(private _dbService: DbService) {
    this.loadGroups();
  }

  loadGroups() {
    this._dbService.group.toArray().then((list: IGroupItem[]) => {
      this.groups = list;
    })
  }

  addGroup(group: IGroupItem) {
    const promise = this._dbService.group.add(group);
    promise.then(() => this.loadGroups());
    return promise;
  }

  getGroup(id: number) {
    return this._dbService.group.where('id').equals(id).first();
  }

  updateGroup(id: number, group: IGroupItem) {
    const promise = this._dbService.group.update(id, group);
    promise.then(() => this.loadGroups());
    return promise;
  }

  removeGroup(id: number) {
    const promise = Dexie.Promise.all([
      this._dbService.group.delete(id),
      this._dbService.card.where('groupId').equals(id).delete()
    ]);
    promise.then(() => this.loadGroups());
    return promise;
  }

  getCards(groupId?: number) {
    return this._dbService.card.where('groupId').equals(groupId).sortBy('wordToLearn');
  }

  getCard(cardId?: number) {
    return this._dbService.card.where('id').equals(cardId).first();
  }

  getNextCard(groupId: number, cardId: number): Dexie.Promise<ICardInfo> {
    return new Dexie.Promise((resolve, reject) => {
      this.getCards(groupId).then((cards: ICardInfo[]) => {
        const currentIndex = cards.findIndex(({ id }) => id === cardId);
        if (cards.length - 1 === currentIndex) {
          resolve(cards[ 0 ]);
          return;
        }
        resolve(cards[ currentIndex + 1 ]);
      });
    });
  }

  addCard(card: ICardInfo) {
    const promise = this._dbService.card.add(card);
    promise.then(() => this.onCardChange.emit());
    return promise;
  }

  updateCard(id: number, card: ICardInfo) {
    const promise = this._dbService.card.update(id, card);
    promise.then(() => this.onCardChange.emit());
    return promise;
  }

  removeCard(id: number) {
    const promise = this._dbService.card.delete(id);
    promise.then(() => this.onCardChange.emit());
    return promise;
  }

}
