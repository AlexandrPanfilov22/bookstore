import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { ModalService } from '../../services/modal.service';
import { IAuthor } from '../../../core/interfaces/authors.interface';


@Component({
  selector: 'app-modal-authors-list',
  templateUrl: './modal-authors-list.component.html',
  styleUrls: ['./modal-authors-list.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatDividerModule,
  ],
})
export class ModalAuthorsListComponent {

  @Input()
  public dataList!: IAuthor[];

  constructor(
    private _modalService: ModalService,
  ) { }

  public closeModal(): void {
    this._modalService.closeModal();
  }
}
