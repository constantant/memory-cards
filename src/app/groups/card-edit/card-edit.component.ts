import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { combineLatest, concat, of, Subject } from 'rxjs';
import { map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Card } from '../models/card.model';
import { CardEntityService } from '../services/card-entity.service';
import { GroupEntityService } from '../services/group-entity.service';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: [ './card-edit.component.scss' ]
})
export class CardEditComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  isEditMode$ = this.activatedRoute.params.pipe(
    map(({ cardId }) => !!cardId)
  );

  form$ = this.activatedRoute.params.pipe(
    switchMap(({ groupId, cardId }) => (
      cardId ?
        this.cardEntityService.collection$.pipe(
          takeUntil(this.destroy$),
          // tslint:disable-next-line:no-non-null-assertion
          map(({ entities }) => entities[ cardId ]!),
          map((card: Card) => this.getForm(groupId, card))
        ) :
        of(this.getForm(groupId || 0))
    )),
    shareReplay(1)
  );

  groups$ = this.groupEntityService.entities$.pipe(takeUntil(this.destroy$));

  showGroupName$ = this.form$.pipe(
    switchMap(form => concat(
      of(form.controls.groupId.value),
      form.controls.groupId.valueChanges
    ).pipe(
      tap(groupId => {
        const groupNameControl = form.controls.groupName;
        if (groupId && groupNameControl.enabled) {
          groupNameControl.disable();
        }
        if (!groupId && groupNameControl.disabled) {
          groupNameControl.enable();
        }
      })
    )),
    map(groupId => !groupId)
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly cardEntityService: CardEntityService,
    private readonly groupEntityService: GroupEntityService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }

    const { id, groupId, word, translated, examples } = form.value as Card;

    const addGroup$ = form.value.groupName ?
      // @ts-ignore
      this.groupEntityService.add({ name: form.value.groupName }) :
      this.groups$.pipe(
        // tslint:disable-next-line:no-non-null-assertion
        map(groups => groups.find(group => group.id === groupId)!)
      );
    combineLatest([ addGroup$, this.isEditMode$ ]).pipe(
      switchMap(([ group, isEditMode ]) => isEditMode ?
        this.cardEntityService.update({ id, word, translated, examples, groupId: group.id }) :
        // @ts-ignore
        this.cardEntityService.add({ word, translated, examples, groupId: group.id })
      ),
      takeUntil(this.destroy$),
    ).subscribe(card => {
      this.router.navigate([ '/', card.groupId ]);
    });
  }

  private getForm(group: string, card?: Card): FormGroup {
    const { id, groupId, word, translated, examples } = card || {
      id: 0,
      groupId: Number(group),
      word: '',
      translated: '',
      examples: '',
    };
    return this.formBuilder.group({
      id: [ id, Validators.required ],
      groupId: [ groupId, Validators.required ],
      groupName: [ { value: '', disabled: !groupId }, Validators.required ],
      word: [ word, Validators.required ],
      translated: [ translated, Validators.required ],
      examples: [ examples ],
    });
  }

}
