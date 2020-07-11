import { Component, ComponentRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StoreService } from '../services/store.service';

const checkGroup = (): ValidatorFn => {
  return (control: AbstractControl) => {
    const id = control.get('id');
    const name = control.get('name');
    if (!id?.value && !name?.value) {
      return { group: true };
    }
    return null;
  };
};

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: [ './popup.component.css' ]
})
export class PopupComponent {

  readonly form: FormGroup = this.formBuilder.group({
    group: this.formBuilder.group({
      id: 0,
      name: ''
    }, {
      validator: checkGroup()
    }),
    word: [ '', Validators.required ],
    translated: [ '', Validators.required ],
    examples: ''
  });

  componentRef: ComponentRef<PopupComponent> | null = null;

  isEdit = false;

  cardId = 0;

  showGroupName = true;

  set data(value: IFormData) {
    value.group.name = this.groupName;
    this.form.setValue(value);
    this.formData = value;
  }

  get data(): IFormData {
    return this.formData || {
      group: { id: 0, name: '' },
      word: '',
      translated: '',
      examples: ''
    };
  }

  private formData: IFormData | null = null;

  get groups(): IGroupItem[] {
    if (!this.storeService) {
      return [];
    }
    return this.storeService.groups;
  }

  get groupName(): string {
    return `Group #${this.groups.length + 1}`;
  }

  get groupId(): string {
    const first = this.storeService.currentGroupData || this.groups[ 0 ];
    return first && `${first.id}` || '';
  }

  constructor(private readonly route: Router,
              private readonly formBuilder: FormBuilder,
              private readonly storeService: StoreService) {
    this.createForm();
  }

  createForm(): void {
    this.form.patchValue({
      group: { id: this.groupId, name: this.groupName }
    }, { emitEvent: false });
    this.form.valueChanges.subscribe((value) => {
      const groupId = value.group.id;
      this.showGroupName = !groupId;
    });

    this.showGroupName = !this.groupId;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { group, word, translated, examples } = this.form.value;

      if (this.isEdit) {
        if (group.id) {
          this.storeService.updateCard(this.cardId, {
            id: this.cardId,
            groupId: +group.id,
            word,
            translated,
            examples
          }).then(() => this.close());
          return;
        }

        this.storeService.addGroup({ name: group.name }).then((groupId: number) => {
          this.storeService.updateCard(this.cardId, {
            id: this.cardId,
            groupId,
            word,
            translated,
            examples
          }).then(() => this.close());
        });
        return;
      }

      if (group.id) {
        this.storeService.addCard({
          groupId: +group.id,
          word,
          translated,
          examples
        }).then(() => this.close());
        return;
      }

      this.storeService.addGroup({ name: group.name }).then((groupId: number) => {
        this.storeService.addCard({
          groupId,
          word,
          translated,
          examples
        }).then(() => this.close());
      });
    }
  }

  deleteCard(): void {
    if (!confirm(`Are you sure?\nYou are going to delete "${this.data.word}" word.`)) {
      return;
    }

    const groupId = this.data.group.id;
    this.storeService.removeCard(this.cardId)
      .then(() => this.route.navigate([ groupId ])
        .then(() => close()));
  }

  close(): void {
    this.componentRef?.destroy();
  }

}
