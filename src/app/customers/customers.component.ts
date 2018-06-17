import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CustomerService } from '../customer.service'
import Customer from '../models/customer'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  displayedColumns = ['firstname', 'lastname', 'company', 'phone', 'action'];
  position: string = "left";
  position2: string = "right";
  dataSource: any;

  constructor(private customerService: CustomerService, public dialog: MatDialog) { }

  ngOnInit() {
    this.setCustomers();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  removeCustomer(email: string) {
    this.customerService.removeCustomer(email).subscribe((data) => {
      console.log("we returned here!!")
      console.log(data);
      this.setCustomers();
      // this.router.navigate['/']  ;
    });
  }

  openDialog(customer: Customer): void {
    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '350px',
      height: '450px',
      data: customer
    });
    dialogRef.afterClosed().subscribe(result => {
      this.customerService.editCustomer(result).subscribe(() => {
        this.setCustomers();
      })
    });
  }

  setCustomers() {
    this.customerService.getCustomers();
    this.customerService.customersUpdate.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}