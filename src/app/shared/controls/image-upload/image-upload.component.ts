import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

const VALID_EXTENSION: string = 'png, jpg, jpeg';


@Component({
  standalone: true,
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true,
    },
  ],
})
export class ImageUploadComponent implements ControlValueAccessor {

  @Input()
  public fileSizeInBytes!: number;

  public dataUrl!: string;
  public isValidControl: boolean = false;

  private _onChange!: (value: File) => void;
  private _onTouched!: () => void;

  public writeValue(value: string): void {
    this.dataUrl = value;
  }

  public registerOnChange(onChange: (value: File) => void): void {
    this._onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this._onTouched = onTouched;
  }

  public onFileChange(event: Event): void {
    this._onTouched();
    const fileList: FileList | null = (event.target as HTMLInputElement).files;

    if (fileList && fileList.length > 0) {
      const file: File = fileList[0];
      const reader: FileReader = new FileReader();

      reader.onload = () => {
        this.dataUrl = reader.result as string;
        this._onChange(file);
      };

      reader.readAsDataURL(file);
    }
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    const fileExtension: string = (control.value as File)?.name?.split('.').pop() as string;
    const file: File = control.value as File;

    if (control.value && !VALID_EXTENSION.includes(fileExtension)) {
      this.isValidControl = true;

      return { invalidExtension: true };
    }

    if (file && (file.size > this.fileSizeInBytes)) {
      this.isValidControl = true;

      return { fileSize: true };
    }
    this.isValidControl = false;

    return null;
  }
}
