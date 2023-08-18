import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsComponent } from './components/authors/authors.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';


const routes: Routes = [
  { path: '', component: AuthorsComponent },
  { path: 'create', component: CreateAuthorComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule { }
