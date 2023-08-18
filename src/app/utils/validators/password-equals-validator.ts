import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function passwordEqualsValidator(
  password: string,
  verifyPassword: string,
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const checkedPasswordControl: AbstractControl | null = group.get(verifyPassword);
    const confirmPasswordControl: AbstractControl | null = group.get(password);

    if (checkedPasswordControl && confirmPasswordControl) {
      const checkedPassword = checkedPasswordControl.value as string;
      const confirmPassword = confirmPasswordControl.value as string;

      if (checkedPassword !== confirmPassword) {
        checkedPasswordControl.setErrors({ passwordEquals: true });

        return { passwordEquals: true };
      }
      checkedPasswordControl.updateValueAndValidity({ onlySelf: true });

    }

    return null;
  };
}
