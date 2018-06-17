import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component'
import { CompanyComponent } from './company/company.component'
import { AddCustomerComponent } from './add-customer/add-customer.component'
import { CustomerComponent } from './customer/customer.component'


const routes: Routes = [
  { path: '', component: CustomersComponent},
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'customer/:email', component: CustomerComponent},
  { path: 'company', component: CompanyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
