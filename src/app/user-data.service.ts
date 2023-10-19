import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user-detail.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService{
  private formDataSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  
  setUserFormData(formData: User): void {
    this.formDataSubject.next(formData);
  }

  getUserFormData(): Observable<User> {
    return this.formDataSubject.asObservable();
  }
}
