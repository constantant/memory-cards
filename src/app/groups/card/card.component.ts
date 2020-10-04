import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { combineLatest, of, Subject } from 'rxjs';
import { map, mapTo, shareReplay, switchMap, take, takeUntil } from 'rxjs/operators';

import { Card } from '../models/card.model';
import { CardEntityService } from '../services/card-entity.service';
import { CardDeleteConfirmationComponent } from './card-delete-confirmation/card-delete-confirmation.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.scss' ]
})
export class CardComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  card$ = combineLatest([
    this.activatedRoute.params,
    this.cardEntityService.collection$
  ]).pipe(
    takeUntil(this.destroy$),
    // tslint:disable-next-line:no-non-null-assertion
    map(([ { cardId }, { entities } ]) => entities[ cardId ]!),
    shareReplay(1)
  );

  next$ = this.activatedRoute.params.pipe(
    switchMap(params => this.cardEntityService.getWithQuery({ ...params, next: '1' })),
    map(([ next ]) => next)
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly cardEntityService: CardEntityService,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  delete(): void {
    this.card$.pipe(
      take(1),
      switchMap(card => this.matDialog.open<CardDeleteConfirmationComponent, Card, { confirmed: boolean; card: Card; }>(
        CardDeleteConfirmationComponent,
        { data: card }
      ).afterClosed()),
      switchMap(confirmation => {
        if (!confirmation || !confirmation.confirmed) {
          return of(false);
        }
        return combineLatest([
          this.router.navigate([ '/', confirmation.card.groupId ]),
          this.cardEntityService.delete(confirmation.card)
        ]);
      })
    ).subscribe();
  }
}
