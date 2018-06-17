import { Component, OnInit, Inject } from '@angular/core';
import { CompanyService } from '../company.service'
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'
import Company from '../models/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  displayedColumns = ['name', 'address', 'country', 'counter'];
  dataSource: any;

  constructor(private companyService: CompanyService, public dialog: MatDialog) { }

  ngOnInit() {
    this.companyService.getCompanies();
    this.companyService.companiesUpdate.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '450px',
      data: new Company()
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
      this.companyService.addCompany(result).subscribe((data) => {
        this.companyService.getCompanies();
        this.companyService.companiesUpdate.subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
        });
      })
    });
  }

}


