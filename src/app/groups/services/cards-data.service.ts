import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';

import { NgxIndexedDBService } from 'ngx-indexed-db';

import { Observable } from 'rxjs';
import { map, mapTo, pluck, switchMap } from 'rxjs/operators';

import { Card, cardEntityName } from '../models/card.model';

@Injectable()
export class CardsDataService extends DefaultDataService<Card> {
  private readonly storeName = 'cards';

  constructor(
    private readonly ngxIndexedDBService: NgxIndexedDBService,
    protected readonly http: HttpClient,
    protected readonly httpUrlGenerator: HttpUrlGenerator
  ) {
    super(cardEntityName, http, httpUrlGenerator);
  }

  getAll(): Observable<Card[]> {
    return this.ngxIndexedDBService.getAll(this.storeName);
  }

  getById(key: number | string): Observable<Card> {
    return this.ngxIndexedDBService.getByID(this.storeName, Number(key));
  }

  getWithQuery(queryParams: QueryParams): Observable<Card[]> {
    if ('next' in queryParams) {
      return this.getNextInGroup(queryParams);
    }
    return this.getAllInGroup(queryParams);
  }

  update(update: Update<Card>): Observable<Card> {
    const { groupId, examples, id, translated, word } = update.changes;
    return this.ngxIndexedDBService.update(this.storeName, { groupId, examples, id, translated, word }).pipe(
      map(cards => cards.find(card => card.id === id))
    );
  }

  add({ groupId, translated, word, examples }: Card): Observable<Card> {
    return this.ngxIndexedDBService.add(this.storeName, { groupId, translated, word, examples }).pipe(
      switchMap(cardId => this.ngxIndexedDBService.getByID(this.storeName, cardId))
    );
  }

  delete(key: number | string): Observable<number | string> {
    return this.ngxIndexedDBService.delete(this.storeName, Number(key)).pipe(mapTo(key));
  }

  private getAllInGroup(queryParams: QueryParams): Observable<Card[]> {
    const indexName = 'groupId';
    return this.ngxIndexedDBService.getAllByIndex(this.storeName, indexName, IDBKeyRange.only(Number(queryParams[ indexName ])));
  }

  private getNextInGroup(queryParams: QueryParams): Observable<Card[]> {
    const cardId = queryParams.cardId;
    return this.getAllInGroup(queryParams).pipe(
      map(cards => {
        const currentIndex = cards.findIndex(({ id }) => id === Number(cardId));
        if (cards.length - 1 === currentIndex) {
          return [ cards[ 0 ] ];
        }
        return [ cards[ currentIndex + 1 ] ];
      })
    );
  }
}
