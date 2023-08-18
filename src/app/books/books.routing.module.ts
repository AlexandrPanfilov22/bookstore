import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './components/books/books.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';


const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'create',
    component: CreateBookComponent,
    canDeactivate: [unsavedChangesGuard],
  },
  { path: ':id', component: BookDetailComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule { }
