import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatSnackBarRef } from '@angular/material/snack-bar';


@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarComponent {
  public snackBarRef = inject(MatSnackBarRef);
}
