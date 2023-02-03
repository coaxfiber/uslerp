import { Component, OnInit } from '@angular/core';
import { Inject,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import { ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {

  type
  EmpID
  Venue
  EventTitle
  AwardReceived
  DateAwarded
  AwardingBody

  statusid = 0;
  targetUpdateID
  constructor(public dialogRef: MatDialogRef<AwardsComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	public global: GlobalService,
  	private http: Http,
    private fb: FormBuilder,) { }

  ngOnInit() {
  	this.type = this.data.type;
  	this.EmpID = this.data.selectedID;
  	this.targetUpdateID = this.data.selectedEID
  	if (this.type == "Update") {
  		if (this.data.selectedData.statusId == 1||this.data.selectedData.statusId==null) {
	      this.statusid = 1;
	    }else
      		this.statusid = this.data.selectedData.statusId

  		this.EventTitle = this.data.selectedData.eventTitle;
  		this.AwardReceived = this.data.selectedData.awardReceived;
  		this.AwardingBody = this.data.selectedData.awardingBody;	
  		var date = new Date(this.data.selectedData.dateAwarded);
  		this.DateAwarded = date;
  		this.Venue = this.data.selectedData.venue;
  	}
  	// console.log(this.EmpID);
  }

  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  checked(){
    if (this.statusid==0) this.statusid=1
      else this.statusid=0
  }

  save(): void {
      if(this.type == "Update"){
      	this.global.swalLoading('');

  		this.http.put(this.global.api+'Employee/Award/'+this.targetUpdateID,{
              "EventTitle": this.EventTitle,
              "AwardReceived": this.AwardReceived,
              "AwardingBody": this.AwardingBody,
              "Venue": this.Venue,
              "DateAwarded": this.DateAwarded,
              "statusId": this.statusid ,
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  //console.log(res)
                                  this.global.swalClose();
                                  this.global.swalAlert("","",'success');
                                  this.dialogRef.close({result:"Update success"});    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
      }else{
      	this.http.post(this.global.api+'Employee/Award',{
              "EmployeeId": this.EmpID,
              "EventTitle": this.EventTitle,
              "AwardReceived": this.AwardReceived,
              "AwardingBody": this.AwardingBody,
              "Venue": this.Venue,
              "DateAwarded": this.DateAwarded,
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  this.global.swalClose();
                                  this.global.swalAlert("","",'success');
                                  this.dialogRef.close({result:"Adding Success"});    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
      }
  		
  	                            
  }

}
