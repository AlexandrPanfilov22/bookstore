import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject, takeUntil } from 'rxjs';

import { AuthorsService } from '../../services/authors.service';
import { IAuthor } from '../../../core/interfaces/authors.interface';
import { IAuthorForm } from '../../interfaces/author-form.interface';


@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAuthorComponent implements OnInit, OnDestroy {

  public authorForm!: FormGroup;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
      private _formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private _router: Router,
      private _authorService: AuthorsService,
  ) { }

  public get firstName(): FormControl {
    return this.authorForm.get('firstName') as FormControl;
  }

  public get secondName(): FormControl {
    return this.authorForm.get('secondName') as FormControl;
  }

  public ngOnInit(): void {
    this._createForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public saveAuthor(): void {

    const authorObject: IAuthor = this.authorForm.value as IAuthor;

    this._authorService.postAuthor(authorObject)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          this._snackBar.open(
            'Author is created',
            'Close',
          );

          this._redirectToAuthors();
        },
        error: () => this._snackBar.open(
          'Error adding a author',
          'Close',
        ),
      });
  }

  private _redirectToAuthors(): void {
    this._router.navigate(['authors']);
  }

  private _createForm(): void {
    this.authorForm = this._formBuilder.group<IAuthorForm>({
      firstName: this._formBuilder.control('', Validators.required),
      secondName: this._formBuilder.control('', Validators.required),
    });
  }
}
