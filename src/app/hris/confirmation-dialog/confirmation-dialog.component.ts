import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	private http: Http,
  	private global: GlobalService) {

  	}
  message	
  ngOnInit() {
  	this.message = this.data.message;
  }

   onYesClickclose(): void {
       this.dialogRef.close({result:'deleteConfirm'});

  }
  onNoClick(): void {
       this.dialogRef.close({result:'deleteDenied'});
  }

}
