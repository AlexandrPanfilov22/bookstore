import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function comparisonGreaterDate(
  startDateControl: string,
  endDateControl: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const writingDateControl: AbstractControl | null = control.get(startDateControl);
    const releaseDateControl: AbstractControl | null = control.get(endDateControl);

    if (writingDateControl && releaseDateControl) {
      const writingDate: Date = writingDateControl.value as Date;
      const releaseDate: Date = releaseDateControl.value as Date;

      if ((writingDate && releaseDate) && (writingDate > releaseDate)) {
        releaseDateControl.setErrors({ dateComparisonGreaterDate: true });

        return { dateComparison: true };
      }
      delete releaseDateControl.errors?.['dateComparisonGreaterDate'];
      releaseDateControl.updateValueAndValidity({ onlySelf: true });
    }

    return null;
  };
}
