import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationGuard } from '../utils/guards/authorization.guard';
import { BooksResolver } from '../utils/resolvers/books-resolver';


const routes: Routes = [
  { path: 'authors',
    loadChildren: () => import('../authors/authors.module')
      .then((module: typeof import('../authors/authors.module')) => module.AuthorsModule),
    canActivate: [AuthorizationGuard],
  },

  { path: 'books',
    loadChildren: () => import('../books/books.module')
      .then((module: typeof import('../books/books.module')) => module.BooksModule),
    canActivate: [AuthorizationGuard],
    resolve: { booksResolver: BooksResolver },
  },

  { path: 'cart',
    loadChildren: () => import('../cart/cart.module')
      .then((module: typeof import('../cart/cart.module')) => module.CartModule),
    canActivate: [AuthorizationGuard],
  },

  { path: 'genres',
    loadChildren: () => import('../genres/genres.module')
      .then((module: typeof import('../genres/genres.module')) => module.GenresModule),
    canActivate: [AuthorizationGuard],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
