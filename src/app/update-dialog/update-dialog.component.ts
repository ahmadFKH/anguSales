import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onCloseNo(): void {
    this.dialogRef.close();
  }

  onCloseOk() {
    this.dialogRef.close(this.data);
  }

}
