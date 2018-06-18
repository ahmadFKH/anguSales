import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { SearchComponent } from './search/search.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CommentsComponent } from './comments/comments.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { CommentService } from './comment.service';
import { CompanyService } from './company.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CompanyComponent } from './company/company.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { ShowCompanyComponent } from './show-company/show-company.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomersComponent,
    CustomerComponent,
    SearchComponent,
    AddCustomerComponent,
    CommentsComponent,
    CompanyComponent,
    DialogComponent,
    UpdateDialogComponent,
    ShowCompanyComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule
  ],
  entryComponents: [DialogComponent,UpdateDialogComponent],
  providers: [CustomerService, CommentService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
