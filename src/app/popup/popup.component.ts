import { Component, ComponentRef, OnInit } from '@angular/core';
import { StoreService } from "../services/store.service";
import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: [ './popup.component.css' ]
})
export class PopupComponent implements OnInit {

  form: FormGroup;

  componentRef: ComponentRef<PopupComponent>;

  isEdit: boolean = false;

  cardId: number;

  showGroupName: boolean = true;

  set data(value: IFormData) {
    value.group.name = this.groupName;
    this.form.setValue(value);
    this._data = value;
  };

  get data(): IFormData {
    return this._data;
  };

  private _data: IFormData;

  get groups(): IGroupItem[] {
    if (!this._storeService) {
      return [];
    }
    return this._storeService.groups;
  }

  get groupName() {
    return `Group #${this.groups.length + 1}`;
  }

  get groupId() {
    let first = this.groups[ 0 ];
    return first && first.id || '';
  }

  constructor(private _route: Router,
              private _formBuilder: FormBuilder,
              private _storeService: StoreService) {
    this.createForm();
  }

  createForm() {
    this.form = this._formBuilder.group({
      group: this._formBuilder.group({
        id: this.groupId,
        name: this.groupName
      }, {
        validator: PopupComponent.checkGroup()
      }),
      word: [ '', Validators.required ],
      translated: [ '', Validators.required ],
      examples: ''
    });

    this.form.valueChanges.subscribe((value) => {
      let groupId = value.group.id;
      this.showGroupName = !groupId;
    });

    this.showGroupName = !this.groupId;
  }

  onSubmit() {
    if (this.form.valid) {
      let { group, word, translated, examples } = this.form.value;

      if (this.isEdit) {
        if (group.id) {
          this._storeService.updateCard(this.cardId, {
            groupId: +group.id,
            word,
            translated,
            examples
          }).then(() => this.close());
          return;
        }

        this._storeService.addGroup({ name: group.name }).then((groupId: number) => {
          this._storeService.updateCard(this.cardId, {
            groupId,
            word,
            translated,
            examples
          }).then(() => this.close());
        });
        return;
      }

      if (group.id) {
        this._storeService.addCard({
          groupId: +group.id,
          word,
          translated,
          examples
        }).then(() => this.close());
        return;
      }

      this._storeService.addGroup({ name: group.name }).then((groupId: number) => {
        this._storeService.addCard({
          groupId,
          word,
          translated,
          examples
        }).then(() => this.close());
      });
    }
  }

  deleteCard() {
    if (!confirm(`Are you sure?\nYou are going to delete "${this.data.word}" word.`)) {
      return;
    }

    let groupId = this.data.group.id;
    this._storeService.removeCard(this.cardId)
      .then(() => this._route.navigate([ groupId ])
        .then(() => this.componentRef.destroy()));
  }

  close() {
    this.componentRef.destroy();
  }

  ngOnInit() {

  }

  static checkGroup(): ValidatorFn {
    return (control: FormGroup) => {
      let { id, name } = control.controls;
      if (!id.value && !name.value) {
        return { group: true }
      }
      return null;
    }
  }

}
