import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Group } from '../../models/group.model';

@Component({
  selector: 'app-group-delete-confirmation',
  templateUrl: './group-delete-confirmation.component.html',
  styleUrls: [ './group-delete-confirmation.component.scss' ]
})
export class GroupDeleteConfirmationComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly group: Group,
    private readonly matDialogRef: MatDialogRef<GroupDeleteConfirmationComponent, { confirmed: boolean; group: Group; }>
  ) {}

  confirm(): void {
    this.matDialogRef.close({ confirmed: true, group: this.group });
  }

  close(): void {
    this.matDialogRef.close({ confirmed: false, group: this.group });
  }
}
