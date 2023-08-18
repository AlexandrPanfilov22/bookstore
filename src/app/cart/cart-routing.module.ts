import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './components/cart/cart.component';
import { MakeOrderComponent } from './components/make-order/make-order.component';


const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'make-order', component: MakeOrderComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule { }
