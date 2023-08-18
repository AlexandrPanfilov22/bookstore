import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject, takeUntil } from 'rxjs';

import { AuthorizationService } from '../../services/authorization.service';
import { ILogIn } from '../../interfaces/authorization.interface';
import { AvailableEmailValidator } from '../../../utils/validators/available-email-validator';
import { passwordEqualsValidator } from '../../../utils/validators/password-equals-validator';
import { IFormRegister } from '../../interfaces/form-register.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public hidePassword: boolean = true;
  public hideVerifyPassword: boolean = true;

  private _destroy$ = new Subject<void>();

  constructor(
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _authorizationService: AuthorizationService,
      private _availableEmailValidator: AvailableEmailValidator,
      private _snackBar: MatSnackBar,
  ) { }

  public get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  public get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  public get verifyPassword(): FormControl {
    return this.form.get('verifyPassword') as FormControl;
  }

  public ngOnInit(): void {
    this._createForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.register();
  }

  public register(): void {
    const userData: ILogIn = {
      email: this.email.value as string,
      password: this.password.value as string,
    };

    this._authorizationService.register(userData)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          this.openSnackBarSubmit('Successfully registered', 'Close');
          this._router.navigate(['/login']);
        },
        error: () => this.openSnackBarError('Error registration', 'Close'),
      });
  }

  public openSnackBarSubmit(message: string, action: string): void {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  public openSnackBarError(message: string, action: string): void {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  private _createForm(): void {
    this.form = this._formBuilder.group<IFormRegister>({
      email: this._formBuilder.control('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: this._availableEmailValidator.availableEmailValidator(),
      }),
      password: this._formBuilder.control('', [Validators.required, Validators.minLength(6)]),
      verifyPassword: this._formBuilder.control('', [Validators.required, Validators.minLength(6)]),
    }, { validators: passwordEqualsValidator('password', 'verifyPassword' ) });
  }
}
