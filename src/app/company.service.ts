import { Injectable } from '@angular/core';
import Company from './models/company';
import { Subject } from 'rxjs/';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class CompanyService {

  public allCompanies: Company[];
  public companiesUpdate: Observable<Company[]>;
  public companiesSubject: Subject<Company[]>;
  public companyUpdate: Observable<Company>;
  public companySubject: Subject<Company>;

  constructor(private http: HttpClient) {
    this.companiesSubject = new Subject<Company[]>();
    this.companiesUpdate = this.companiesSubject.asObservable();
    this.companySubject = new Subject<Company>();
    this.companyUpdate = this.companySubject.asObservable();
  }

  getCompanies() {
    const objservble = this.http.get<Company[]>('http://localhost:3000/companies');
    objservble.subscribe((res) => {
      this.allCompanies = res;
      this.companiesSubject.next(this.allCompanies);
    });
  }

  addCompany(newCompany : Company) {
    return this.http.post<Company>('http://localhost:3000/companies/add-company', {company : newCompany});
  }

}
