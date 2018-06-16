import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { CommentService } from '../comment.service';
import Customer from '../models/customer';
import Comment from '../models/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { runInNewContext } from 'vm';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customer : Customer = new Customer();
  public comments  : Comment[] = [];
  public comment : Comment = new Comment();
  private commentText : string;

  constructor(private commentService: CommentService  ,private customerService: CustomerService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.customerService.getCustomer(params.email);
      this.customerService.customerUpdate.subscribe((data) => {
        this.customer = data;
      })
      this.commentService.getComments(params.email);
      this.commentService.commentsUpdate.subscribe((data) => {
        this.comments = data;
      })
    });
  }

  removeCustomer(email: string) {
    this.customerService.removeCustomer(email).subscribe((data) => {
    // this.router.navigate['/']  ;
    });
  }

  addComment(text: string) {
    let newComment = new Comment();
    newComment.text = text;
    newComment.date = new Date();
    newComment.comment_id = Math.random().toString(36).substr(2, 16);
    newComment.customer_email = this.customer.email;
    this.commentService.addComment(newComment).subscribe((data) => {
      this.comment = data;
      this.comments.push(this.comment);
    })
  }


}

