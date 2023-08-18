import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GenresRoutingModule } from './genres-routing.module';
import { GenresComponent } from './components/genres/genres.component';
import { GenresListComponent } from './components/genres-list/genres-list.component';


@NgModule({
  declarations: [
    GenresComponent,
    GenresListComponent,
  ],
  imports: [
    CommonModule,
    GenresRoutingModule,
    MatListModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class GenresModule { }
