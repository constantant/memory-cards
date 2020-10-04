import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { GroupEntityService } from '../services/group-entity.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: [ './group-edit.component.scss' ]
})
export class GroupEditComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  form$ = combineLatest([
    this.activatedRoute.params,
    this.groupEntityService.collection$
  ]).pipe(
    takeUntil(this.destroy$),
    // tslint:disable-next-line:no-non-null-assertion
    map(([ { groupId }, { entities } ]) => entities[ groupId ]!),
    filter(group => !!group),
    map(({ id, name }) => {
      return this.formBuilder.group({
        id: [ id, Validators.required ],
        name: [ name, Validators.required ]
      });
    })
  );

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly groupEntityService: GroupEntityService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  submit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    this.groupEntityService.update(form.value).subscribe(group => {
      this.router.navigate([ '/', group.id ]);
    });
  }
}
