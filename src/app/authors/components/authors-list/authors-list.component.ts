import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IAuthor } from '../../../core/interfaces/authors.interface';


@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsListComponent {

  @Input()
  public authors!: IAuthor[];
}
