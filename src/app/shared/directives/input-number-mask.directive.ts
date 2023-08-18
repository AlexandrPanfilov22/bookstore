import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputNumberMask]',
})
export class InputNumberMaskDirective {
  constructor(
      private _elementRef: ElementRef,
  ) { }

  @HostListener('input', ['$event'])
  private _onInputChange(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const regex: RegExp = /[^0-9.\-/]/g;

    const value: string = input.value;
    input.value = value.replace(regex, '');
  }
}
