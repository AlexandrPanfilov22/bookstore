import { FormControl } from '@angular/forms';

export interface IFormRegister {
  email: FormControl<string | null>,
  password: FormControl<string | null>,
  verifyPassword: FormControl<string | null>,
}
