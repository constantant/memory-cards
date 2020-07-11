import { EventEmitter, Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable()
export class StoreService {

  groups: IGroupItem[] = [];

  cardHasShown = false;

  currentGroupData: IFormGroupData | null = null;

  onCardChange: EventEmitter<number> = new EventEmitter();

  constructor(private readonly dbService: NgxIndexedDBService) {
    this.loadGroups();
  }

  loadGroups(): void {
    this.dbService.getAll<IGroupItem>('groups').then((list: IGroupItem[]) => {
      this.groups = list;
    });
  }

  addGroup(group: IGroupItem): Promise<number> {
    const promise = this.dbService.add('groups', group);
    promise.then(() => this.loadGroups());
    return promise;
  }

  getGroup(id: number): Promise<IGroupItem> {
    return this.dbService.getByID('groups', id);
  }

  updateGroup(id: number, group: IGroupItem): Promise<IGroupItem> {
    const promise = this.dbService.update('groups', group);
    promise.then(() => this.loadGroups());
    return promise;
  }

  removeGroup(id: number): Promise<void[]> {
    const promise = Promise.all([
      this.dbService.delete('groups', id),
      this.dbService.getAllByIndex<ICardInfo>('cards', 'groupId', IDBKeyRange.only(id))
        .then((cards: ICardInfo[]) => cards.forEach((card: ICardInfo) => this.dbService.delete('cards', id)))
    ]);
    promise.then(() => this.loadGroups());
    return promise;
  }

  getCards(groupId: number): Promise<ICardInfo[]> {
    return this.dbService.getAllByIndex<ICardInfo>('cards', 'groupId', IDBKeyRange.only(groupId));
  }

  getCard(cardId: number): Promise<ICardInfo> {
    return this.dbService.getByID('cards', cardId);
  }

  getNextCard(groupId: number, cardId: number): Promise<ICardInfo> {
    return new Promise((resolve, reject) => {
      this.getCards(groupId)
        .then((cards: ICardInfo[]) => {
          const currentIndex = cards.findIndex(({ id }) => id === cardId);
          if (cards.length - 1 === currentIndex) {
            resolve(cards[ 0 ]);
            return;
          }
          resolve(cards[ currentIndex + 1 ]);
        })
        .catch(() => reject());
    });
  }

  addCard(card: ICardInfo): Promise<number> {
    const promise = this.dbService.add('cards', card);
    promise.then(() => this.onCardChange.emit());
    return promise;
  }

  updateCard(id: number, card: ICardInfo): Promise<ICardInfo> {
    const promise = this.dbService.update('cards', card);
    promise.then(() => this.onCardChange.emit());
    return promise;
  }

  removeCard(id: number): Promise<void> {
    const promise = this.dbService.delete('cards', id);
    promise.then(() => this.onCardChange.emit());
    return promise;
  }

}
