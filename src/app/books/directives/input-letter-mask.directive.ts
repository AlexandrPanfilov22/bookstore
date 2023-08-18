import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Directive({
  selector: '[inputLetterMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputLetterMaskDirective,
    multi: true,
  }],
})
export class InputLetterMaskDirective implements ControlValueAccessor {

  private _onTouched!: () => void;
  private _onChange!: (value: string) => void;

  constructor(
      private _elementRef: ElementRef<HTMLInputElement>,
  ) { }

  @HostListener('input')
  public onInputChange(): void {
    const input: HTMLInputElement = this._elementRef.nativeElement;
    const regex: RegExp = /[^а-яА-ЯЁёa-zA-Z.\- ]/g;

    let value: string = input.value;
    value = value.replace(regex, '');
    this._elementRef.nativeElement.value = value;

    this._onChange(value);
  }

  @HostListener('blur')
  public onBlur(): void {
    this._onTouched();
  }

  public writeValue(value: string): void {
    this._elementRef.nativeElement.value = value || '';
  }

  public registerOnChange(onChange: (value: string) => void): void {
    this._onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this._onTouched = onTouched;
  }
}
