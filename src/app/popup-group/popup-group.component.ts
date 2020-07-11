import { Component, ComponentRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-popup-group',
  templateUrl: './popup-group.component.html',
  styleUrls: [ './popup-group.component.css' ]
})
export class PopupGroupComponent {

  readonly form: FormGroup = this.formBuilder.group({
    id: '',
    name: [ '', Validators.required ],
  });

  componentRef: ComponentRef<PopupGroupComponent> | null = null;

  set data(value: IFormGroupData) {
    this.form.setValue(value);
    this.formData = value;
  }

  get data(): IFormGroupData {
    return this.formData || { id: 0, name: '' };
  }

  private formData: IFormGroupData | null = null;

  get groups(): IGroupItem[] {
    if (!this.storeService) {
      return [];
    }
    return this.storeService.groups;
  }

  constructor(private readonly route: Router,
              private readonly formBuilder: FormBuilder,
              private readonly storeService: StoreService) {
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { id, name } = this.form.value;

      this.storeService.updateGroup(id, { id, name }).then(() => {
        if (this.storeService.currentGroupData) {
          this.storeService.currentGroupData.name = name;
        }
        this.close();
      });
    }
  }

  deleteGroup(): void {
    if (!confirm(`Are you sure?\nYou are going to delete "${this.data.name}" group and all included cards`)) {
      return;
    }

    if (!this.data.id) {
      return;
    }

    this.storeService.removeGroup(this.data.id).then(() => {
      this.route.navigate([ '' ]);
      this.close();
    });
  }

  close(): void {
    this.componentRef?.destroy();
  }
}
