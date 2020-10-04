import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Card } from '../../models/card.model';

@Component({
  selector: 'app-card-delete-confirmation',
  templateUrl: './card-delete-confirmation.component.html',
  styleUrls: [ './card-delete-confirmation.component.scss' ]
})
export class CardDeleteConfirmationComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly card: Card,
    private readonly matDialogRef: MatDialogRef<CardDeleteConfirmationComponent, { confirmed: boolean; card: Card; }>
  ) {}

  confirm(): void {
    this.matDialogRef.close({ confirmed: true, card: this.card });
  }

  close(): void {
    this.matDialogRef.close({ confirmed: false, card: this.card });
  }
}
