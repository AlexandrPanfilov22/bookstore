import { CreateBookComponent } from '../components/create-book/create-book.component';
import { inject } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';


export function unsavedChangesGuard(component: CreateBookComponent): Observable<boolean> | boolean {
  if (component.bookForm.dirty && !component.isDataSaved) {
    const dialog: MatDialog = inject(MatDialog);
    const dialogRef: MatDialogRef<ConfirmDialogComponent> = dialog.open(ConfirmDialogComponent,
      { disableClose: true });

    return dialogRef.afterClosed();
  }

  return true;
}
