import { Pipe, PipeTransform } from '@angular/core';

import { IAuthor } from '../../core/interfaces/authors.interface';


@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  public transform(value: IAuthor): string {
    return `${value.firstName} ${value.secondName}`;
  }
}
