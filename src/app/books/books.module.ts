import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { 
  DateAdapter, 
  MAT_DATE_FORMATS, MAT_DATE_LOCALE, 
  MatNativeDateModule, 
} from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BooksComponent } from './components/books/books.component';
import { BooksRoutingModule } from './books.routing.module';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BooksService } from './services/books.service';
import { BookComponent } from './components/book/book.component';
import { PipesModule } from '../shared/pipes.module';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { InputLetterMaskDirective } from './directives/input-letter-mask.directive';
import { FilterBooksComponent } from './components/filter-books/filter-books.component';
import { MY_DATE_FORMATS } from '../utils/constants';
import { DirectivesModule } from '../shared/directives.module';
import { CustomDateAdapter } from '../utils/classes/custom-date-adapter';
import { ImageUploadComponent } from '../shared/controls/image-upload/image-upload.component';


@NgModule({
  declarations: [
    BooksComponent,
    BookDetailComponent,
    BookComponent,
    CreateBookComponent,
    SnackBarComponent,
    InputLetterMaskDirective,
    FilterBooksComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    BooksRoutingModule,
    MatIconModule,
    PipesModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatExpansionModule,
    DirectivesModule,
    ImageUploadComponent,
    MatProgressSpinnerModule,
  ],
  providers: [
    BooksService,
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'ru' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
})
export class BooksModule { }
