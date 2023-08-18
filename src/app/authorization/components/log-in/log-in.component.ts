import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { AuthorizationService } from '../../services/authorization.service';
import { ILogIn } from '../../interfaces/authorization.interface';
import { IFormAuthorizationInterface } from '../../interfaces/form-authorization.interface';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogInComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public hidePassword: boolean = true;

  private _destroy$ = new Subject<void>();

  constructor(
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _authorizationService: AuthorizationService,
      private _cd: ChangeDetectorRef,
  ) { }

  public get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  public get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  public ngOnInit(): void {
    this._createForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public login(): void {
    if (this.form.invalid) {
      return;
    }

    const userData = this.form.value as ILogIn;
    this._authorizationService.login(userData)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          this._router.navigate(['/books']);
        },
        error: () => {
          this.form.setErrors({ errorAuthorization: true });
          this._cd.markForCheck();
        },
      });
  }

  private _createForm(): void {
    this.form = this._formBuilder.group<IFormAuthorizationInterface>({
      email: this._formBuilder.control('', Validators.required),
      password: this._formBuilder.control('', Validators.required),
    });
  }
}
