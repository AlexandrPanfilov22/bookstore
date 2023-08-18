import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ModalService } from '../../services/modal.service';
import { IAuthor } from '../../../core/interfaces/authors.interface';
import { PipesModule } from '../../pipes.module';


@Component({
  selector: 'app-modal-author-detail',
  templateUrl: './modal-author-detail.component.html',
  styleUrls: ['./modal-author-detail.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    PipesModule,
  ],
})
export class ModalAuthorDetailComponent {

  @Input()
  public data!: IAuthor;

  constructor(
    private _modalService: ModalService,
  ) { }

  public closeModal(): void {
    this._modalService.closeModal();
  }
}
