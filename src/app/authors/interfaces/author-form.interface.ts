import { FormControl } from '@angular/forms';

export interface IAuthorForm {
    firstName: FormControl<string | null>;
    secondName: FormControl<string | null>;
}
