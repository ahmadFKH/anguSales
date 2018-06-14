import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import Customer from '../models/customer';
import Comment from '../models/comment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customer : Customer = new Customer();
  public comments  : Comment[] = [];

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.customerService.getCustomer(params.email);
      this.customerService.customerUpdate.subscribe((data) => {
        this.customer = data;
      })
      this.customerService.getComments(params.email);
      this.customerService.commentsUpdate.subscribe((data) => {
        this.comments = data;
      })
    });
  }

  removeCustomer(email: string) {
    this.customerService.removeCustomer(email).subscribe((data) => {
    // this.router.navigate['/']  ;
    });
  }


}

