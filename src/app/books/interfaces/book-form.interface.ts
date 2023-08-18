import { FormControl } from '@angular/forms';

export interface IFormBook {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  price: FormControl<number | null>;
  author: FormControl<number[] | null>;
  genres: FormControl<number[] | null>;
  writingDate: FormControl<string | null>;
  releaseDate: FormControl<string | null>;
  image: FormControl<string | null>;
}
