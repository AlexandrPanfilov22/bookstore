import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IGenre } from '../../../core/interfaces/genres.interface';


@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresListComponent {

  @Input()
  public genres!: IGenre[];
}
