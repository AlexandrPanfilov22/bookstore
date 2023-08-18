import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ZipcodeValidator } from '../../../utils/validators/zipcode-validator';
import { IMakeOrder } from '../../interfaces/make-order.interface';


@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeOrderComponent implements OnInit {

  public orderForm!: FormGroup;

  constructor(
      private _formBuilder: FormBuilder,
      private _zipcodeValidator: ZipcodeValidator,
  ) { }

  public get city(): FormControl {
    return this.orderForm.get('city') as FormControl;
  }

  public get address(): FormControl {
    return this.orderForm.get('address') as FormControl;
  }

  public get zipCode(): FormControl {
    return this.orderForm.get('zipcode') as FormControl;
  }

  public ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {
    this.orderForm = this._formBuilder.group<IMakeOrder>({
      city: this._formBuilder.control('', Validators.required),
      address: this._formBuilder.control('', Validators.required),
      zipcode: this._formBuilder.control('',
        { 
          validators: Validators.required,
          asyncValidators: this._zipcodeValidator.zipcodeValidator(), 
        }),
    });
  }
}
