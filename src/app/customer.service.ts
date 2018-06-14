import { Injectable } from '@angular/core';
import Customer  from './models/customer'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/';
import { Observable } from 'rxjs/';

@Injectable()
export class CustomerService {

  allCustomers: Customer[];
  public customersUpdate: Observable<Customer[]>;
  public customersSubject: Subject<Customer[]>;
  public customerUpdate: Observable<Customer>;
  public customerSubject: Subject<Customer>;

  constructor(private http: HttpClient) { 
    this.customersSubject = new Subject<Customer[]>();
    this.customerSubject = new Subject<Customer>();
    this.customersUpdate = this.customersSubject.asObservable();
    this.customerUpdate = this.customerSubject.asObservable();
  }

  getCustomers() {
    const objservble = this.http.get<Customer[]>('http://localhost:3000/customers');
    objservble.subscribe((res) => {
      this.allCustomers = res;
      this.customersSubject.next(this.allCustomers);
    });    
  }

  getCustomer(email: string) {
    const observble = this.http.get<Customer[]>('http://localhost:3000/customers/' + email);
    return observble;
  }

}
