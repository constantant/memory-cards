import { EventEmitter, Injectable } from '@angular/core';
import { DbService } from "./db.service";

@Injectable()
export class StoreService {

  groups: IGroupItem[] = [];

  cardHasShown: boolean = false;

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
    let promise = this._dbService.group.add(group);
    promise.then(() => this.loadGroups());
    return promise;
  }

  updateGroup(id: number, group: IGroupItem) {
    let promise = this._dbService.group.update(id, group);
    promise.then(() => this.loadGroups());
    return promise;
  }

  removeGroup(id: number) {
    let promise = this._dbService.group.delete(id);
    promise.then(() => this.loadGroups());
    return promise;
  }

  getCards(groupId?: number) {
    return this._dbService.card
      .where('groupId')
      .equals(groupId)
      .sortBy('wordToLearn');
  }

  getCard(cardId?: number) {
    return this._dbService.card
      .where('id')
      .equals(cardId)
      .first();
  }

  getNextCard(cardId?: number) {
    return this._dbService.card
      .where('id')
      .equals(cardId)
      .first();
  }

  addCard(card: ICardInfo) {
    let promise = this._dbService.card.add(card);
    promise.then(() => this.onCardChange.emit());
    return promise;
  }

  updateCard(id: number, card: ICardInfo) {
    let promise = this._dbService.card.update(id, card);
    promise.then(() => this.onCardChange.emit());
    return promise;
  }

  removeCard(id: number) {
    let promise = this._dbService.card.delete(id);
    promise.then(() => this.onCardChange.emit());
    return promise;
  }

}
