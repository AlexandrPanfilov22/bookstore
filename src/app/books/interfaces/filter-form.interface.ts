import { FormControl } from '@angular/forms';

export interface IFilterBook {
    title: FormControl<string | null>;
    author: FormControl<string | null>;
    genre: FormControl<string | null>;
    price_gte: FormControl<number | null>;
    price_lte: FormControl<number | null>;
    writing_date_lte: FormControl<string | null>;
    writing_date_gte: FormControl<string | null>;
}
