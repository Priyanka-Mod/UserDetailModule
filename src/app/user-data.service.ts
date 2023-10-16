import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user-detail.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService{
  private formDataSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as any);
  
  setFormData(formData: User): void {
    console.log('Setting form data:', formData);
    this.formDataSubject.next(formData);
  }

  getFormData(): Observable<User> {
    return this.formDataSubject.asObservable();
  }
}
