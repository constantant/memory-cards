import { Component, ComponentRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { StoreService } from "../services/store.service";

@Component({
  selector: 'app-popup-group',
  templateUrl: './popup-group.component.html',
  styleUrls: [ './popup-group.component.css' ]
})
export class PopupGroupComponent implements OnInit {

  form: FormGroup;

  componentRef: ComponentRef<PopupGroupComponent>;

  set data(value: IFormGroupData) {
    this.form.setValue(value);
    this._data = value;
  };

  get data(): IFormGroupData {
    return this._data;
  };

  private _data: IFormGroupData;

  get groups(): IGroupItem[] {
    if (!this._storeService) {
      return [];
    }
    return this._storeService.groups;
  }

  constructor(private _route: Router,
              private _formBuilder: FormBuilder,
              private _storeService: StoreService) {
    this.createForm();
  }

  createForm() {
    this.form = this._formBuilder.group({
      id: '',
      name: [ '', Validators.required ],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let { id, name } = this.form.value;

      this._storeService.updateGroup(id, { name: name }).then(() => {
        this._storeService.currentGroupData.name = name;
        this.close();
      });
    }
  }

  deleteGroup() {
    if (!confirm(`Are you sure?\nYou are going to delete "${this.data.name}" group and all included cards`)) {
      return;
    }

    this._storeService.removeGroup(this.data.id).then(() => {
      this._route.navigate(['']);
      this.close();
    });
  }

  close() {
    this.componentRef.destroy();
  }

  ngOnInit() {

  }

}
