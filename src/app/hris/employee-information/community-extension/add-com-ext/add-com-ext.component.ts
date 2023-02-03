import { Component, OnInit } from '@angular/core';
import { Inject,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-com-ext',
  templateUrl: './add-com-ext.component.html',
  styleUrls: ['./add-com-ext.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddComExtComponent implements OnInit {

  activity
  date
  location

  constructor(public dialogRef: MatDialogRef<AddComExtComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	private global: GlobalService,
  	private http: Http
  	) { 

  }

  ngOnInit() {
  	
  }
  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }
  
  save(): void {
 	this.global.swalLoading('Adding Community Extension');
    this.http.post(this.global.api+'Employee/CommunityExtension/'+this.data.selectedID,{
              "activity": this.activity,
              "dateConducted": this.date,
              "location": this.location,
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  this.global.swalAlert(res.message,"",'success');
                                  this.dialogRef.close({result:"Adding Success"});    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
  }

}
