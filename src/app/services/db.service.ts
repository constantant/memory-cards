import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Dexie from 'dexie';

@Injectable()
export class DbService extends Dexie {

  public group: Dexie.Table<IGroupItem, number>;

  public card: Dexie.Table<ICardInfo, number>;

  constructor() {
    super(environment.db.name);

    this
      .version(environment.db.version)
      .stores({
        group: '++id, name',
        card: '++id, groupId, word, translated'
      });
  }

}
