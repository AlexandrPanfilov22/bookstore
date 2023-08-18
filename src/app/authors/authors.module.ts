import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatOptionModule } from '@angular/material/core';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './components/authors/authors.component';
import { PipesModule } from '../shared/pipes.module';
import { CreateAuthorComponent } from './components/create-author/create-author.component';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AutocompleteModule } from '../shared/autocomplete.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorsListComponent,
    CreateAuthorComponent,
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    MatListModule,
    PipesModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    AutocompleteModule,
    MatOptionModule,
    MatIconModule,
  ],
})
export class AuthorsModule {}
