import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';
import { map, mapTo, pluck, switchMap, tap } from 'rxjs/operators';

import { NgxIndexedDBService } from 'ngx-indexed-db';

import { Group, groupEntityName } from '../models/group.model';

@Injectable()
export class GroupsDataService extends DefaultDataService<Group> {
  private readonly storeName = 'groups';

  constructor(
    private readonly ngxIndexedDBService: NgxIndexedDBService,
    protected readonly http: HttpClient,
    protected readonly httpUrlGenerator: HttpUrlGenerator
  ) {
    super(groupEntityName, http, httpUrlGenerator);
  }

  getAll(): Observable<Group[]> {
    return this.ngxIndexedDBService.getAll(this.storeName);
  }

  getById(key: number | string): Observable<Group> {
    return this.ngxIndexedDBService.getByID(this.storeName, Number(key));
  }

  update(update: Update<Group>): Observable<Group> {
    const { id, name } = update.changes;
    return this.ngxIndexedDBService.update(this.storeName, { id, name }).pipe(
      map(groups => groups.find(group => group.id === id))
    );
  }

  add({ name }: Group): Observable<Group> {
    return this.ngxIndexedDBService.add(this.storeName, { name }).pipe(
      switchMap(groupId => this.ngxIndexedDBService.getByID(this.storeName, groupId))
    );
  }

  delete(key: number | string): Observable<number | string> {
    return this.ngxIndexedDBService.delete(this.storeName, Number(key)).pipe(mapTo(key));
  }
}
