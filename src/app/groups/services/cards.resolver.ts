import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { CardEntityService } from './card-entity.service';

@Injectable()
export class CardsResolver implements Resolve<boolean> {

  constructor(private readonly cardEntityService: CardEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.cardEntityService.loaded$.pipe(
      tap(loaded => {
        if (loaded) {
          return;
        }
        this.cardEntityService.getWithQuery(route.params);
      }),
      first()
    );
  }
}
