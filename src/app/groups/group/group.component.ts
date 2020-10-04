import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, mapTo, shareReplay, switchMap, take, takeUntil } from 'rxjs/operators';

import { Card } from '../models/card.model';
import { Group } from '../models/group.model';
import { CardEntityService } from '../services/card-entity.service';
import { GroupDeleteConfirmationComponent } from './group-delete-confirmation/group-delete-confirmation.component';
import { GroupEntityService } from '../services/group-entity.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: [ './group.component.scss' ]
})
export class GroupComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  cards$ = combineLatest([
    this.cardEntityService.entities$,
    this.activatedRoute.params
  ]).pipe(
    takeUntil(this.destroy$),
    map(([ cards, { groupId } ]) => cards.filter(card => card.groupId === Number(groupId))),
    shareReplay(1)
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly cardEntityService: CardEntityService,
    private readonly groupEntityService: GroupEntityService,
    private readonly matDialog: MatDialog,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackBy(index: number, { id }: Card): number {
    return id;
  }

  delete(): void {
    combineLatest([
      this.activatedRoute.params,
      this.groupEntityService.collection$
    ]).pipe(
      take(1),
      // tslint:disable-next-line:no-non-null-assertion
      map(([ { groupId }, { entities } ]) => entities[ groupId ]!),
      switchMap(group => this.matDialog.open<GroupDeleteConfirmationComponent, Group, { confirmed: boolean; group: Group; }>(
        GroupDeleteConfirmationComponent,
        { data: group }
      ).afterClosed()),
      switchMap(confirmation => {
        if (!confirmation || !confirmation.confirmed) {
          return of(false);
        }
        return this.deleteGroup(confirmation.group);
      })
    ).subscribe(confirmed => {
      if (confirmed) {
        this.router.navigate([ '/' ]);
      }
    });
  }

  private deleteGroup(group: Group): Observable<true> {
    return this.cards$.pipe(
      switchMap(cards => combineLatest(cards.map(card => this.cardEntityService.delete(card)))),
      switchMap(() => this.groupEntityService.delete(group)),
      mapTo(true)
    );
  }
}
