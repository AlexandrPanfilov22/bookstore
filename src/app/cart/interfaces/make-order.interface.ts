import { FormControl } from '@angular/forms';

export interface IMakeOrder {
    city: FormControl<string | null>,
    address: FormControl<string | null>,
    zipcode: FormControl<string | null>,
}
