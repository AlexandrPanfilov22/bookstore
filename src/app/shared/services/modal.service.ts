import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
} from '@angular/core';

import { ModalAuthorDetailComponent } from '../components/modal-author-detail/modal-author-detail.component';
import { ModalAuthorsListComponent } from '../components/modal-authors-list/modal-authors-list.component';
import { IAuthor } from '../../core/interfaces/authors.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  private _modalRef!: ComponentRef<ModalAuthorDetailComponent | ModalAuthorsListComponent>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector,
    private _applicationRef: ApplicationRef,
  ) {}

  public openAuthorModal(data: IAuthor): void {
    const factory =
      this._componentFactoryResolver.resolveComponentFactory(ModalAuthorDetailComponent);

    this._modalRef = factory.create(this._injector);
    (this._modalRef.instance as ModalAuthorDetailComponent).data = data;
    this._applicationRef.attachView(this._modalRef.hostView);
    const modalElement = this._modalRef.location.nativeElement as HTMLElement;
    document.body.appendChild(modalElement);
  }

  public openAuthorListModal(dataList: IAuthor[]): void {
    const factory =
      this._componentFactoryResolver.resolveComponentFactory(ModalAuthorsListComponent);

    this._modalRef = factory.create(this._injector);
    (this._modalRef.instance as ModalAuthorsListComponent).dataList = dataList;
    this._applicationRef.attachView(this._modalRef.hostView);
    const modalElement = this._modalRef.location.nativeElement as HTMLElement;
    document.body.appendChild(modalElement);
  }

  public closeModal(): void {
    if (this._modalRef) {
      this._applicationRef.detachView(this._modalRef.hostView);
      this._modalRef.destroy();
    }
  }
}
