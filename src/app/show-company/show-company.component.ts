import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company.service';
import Customer from '../models/customer';
import Company from '../models/company';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrls: ['./show-company.component.scss']
})
export class ShowCompanyComponent implements OnInit {

  company: Company = new Company();
  customers: Customer[] = [];

  constructor(private customerService: CustomerService, private companyService: CompanyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.companyService.getCompany(params.name);
      this.companyService.companyUpdate.subscribe((data) => {
        this.company = data;
      })
      this.customerService.getCustomersByCompany(params.name).subscribe((data) => {
        this.customers = data;
      })
    })
  }

}
