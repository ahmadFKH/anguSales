import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import Customer from '../models/customer';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customer: Customer = new Customer();
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private customerService : CustomerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.customerService.addCustomer(this.customer).subscribe((data) => {
      this.customer = data;
      this.router.navigate['']  ;
    })
  }

}
