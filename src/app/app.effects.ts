import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';

import { loadedGroups, loadGroups } from './app.actions';
import { StoreService } from './services/store.service';


@Injectable()
export class AppEffects {

  groups$ = createEffect(() => this.actions$.pipe(
    ofType(loadGroups),
    exhaustMap(action => this.storeService.loadGroups()),
    map((groups: IGroupItem[]) => loadedGroups({ groups }))
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly storeService: StoreService,
  ) {}
}
