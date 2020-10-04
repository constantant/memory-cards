import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { GroupEntityService } from './group-entity.service';

@Injectable()
export class GroupsResolver implements Resolve<boolean> {

  constructor(private readonly groupEntityService: GroupEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.groupEntityService.loaded$.pipe(
      tap(loaded => {
        if (loaded) {
          return;
        }
        this.groupEntityService.getAll();
      }),
      first()
    );
  }
}
