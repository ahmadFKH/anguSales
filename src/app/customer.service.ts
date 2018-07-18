import { Injectable } from '@angular/core';
import Customer from './models/customer'
import Comment from './models/comment'
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/';
import { Observable } from 'rxjs/';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CustomerService {
  c
  public allCustomers: Customer[];
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
    const objservble = this.http.get<Customer[]>('/customers');
    objservble.subscribe((res) => {
      this.allCustomers = res;
      this.customersSubject.next(this.allCustomers);
    });
  }
  getCustomersByCompany(name: string) {
    return this.http.get<Customer[]>('/customers/findByCompany/' + name);

  }
  getCustomer(email: string) {
    const observble = this.http.get<Customer>('/customers/' + email);
    observble.subscribe((res) => {
      this.customerSubject.next(res);
    });
  }

  addCustomer(newCustomer: Customer) {
    return this.http.post<Customer>('/customers/add-customer', { customer: newCustomer });
  }

  removeCustomer(email: string) {
    return this.http.delete('/customers/' + email).subscribe((data) => {
      let index;
      for (var i = 0; i < this.allCustomers.length; i++) {
        if (this.allCustomers[i].email == email) {
          index = i;
        }
      }
      this.allCustomers.splice(index, 1);
      this.customersSubject.next(this.allCustomers);
    })
  }

  editCustomer(customer: Customer) {
    let customerObject = {
      phone: customer.phone,
      company_name: customer.company_name
    }
    this.http.put<Customer[]>('/customers/' + customer.email, { customer: customerObject }).subscribe(data => {
      this.customersSubject.next(data);
    })

  }
}