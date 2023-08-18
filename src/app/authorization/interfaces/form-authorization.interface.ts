import { FormControl } from '@angular/forms';

export interface IFormAuthorizationInterface {
  email: FormControl<string | null>,
  password: FormControl<string | null>,
}
