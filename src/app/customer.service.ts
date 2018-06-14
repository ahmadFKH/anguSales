import { Injectable } from '@angular/core';
import Customer from './models/customer'
import Comment from './models/comment'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/';
import { Observable } from 'rxjs/';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CustomerService {

  public allCustomers: Customer[];
  public customersUpdate: Observable<Customer[]>;
  public customersSubject: Subject<Customer[]>;
  public customerUpdate: Observable<Customer>;
  public customerSubject: Subject<Customer>;
  public commentsUpdate: Observable<Comment[]>;
  public commentsSubject: Subject<Comment[]>;

  constructor(private http: HttpClient) {
    this.customersSubject = new Subject<Customer[]>();
    this.customerSubject = new Subject<Customer>();
    this.commentsSubject = new Subject<Comment[]>();
    this.commentsUpdate = this.commentsSubject.asObservable();
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

  getComments(email: string) {
    const observble = this.http.get<Comment[]>('http://localhost:3000/comments/' + email);
    observble.subscribe((res) => {
      this.commentsSubject.next(res);
  })
  }
  getCustomer(email: string) {
    const observble = this.http.get<Customer>('http://localhost:3000/customers/' + email);
    observble.subscribe((res) => {
      this.customerSubject.next(res);
    });
  }

  addCustomer(newCustomer: Customer) {
    return this.http.post<Customer>('http://localhost:3000/customers/add-customer', { customer: newCustomer });
  }

  removeCustomer(email: string) {
    return this.http.delete('http://localhost:3000/customers/'+ email);
  }

}
