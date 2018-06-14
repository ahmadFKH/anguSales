import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import Customer from '../models/customer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customer : Customer;

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.customerService.getCustomer(params.id);
      this.customerService.customerUpdate.subscribe((data) => {
        this.customer = data;
      })
    });
  }
}

