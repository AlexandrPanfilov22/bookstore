import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputNumberMaskDirective } from './directives/input-number-mask.directive';


@NgModule({
  declarations: [
    InputNumberMaskDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    InputNumberMaskDirective,
  ],
})
export class DirectivesModule { }
