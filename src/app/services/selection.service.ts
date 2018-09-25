import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  constructor() { }

  public subject = new Subject<any>();

  setSelection(selectedProducts) {
    this.subject.next(selectedProducts);
  }

  getSelection(): Observable<any> {
    return this.subject.asObservable();
  }

}
