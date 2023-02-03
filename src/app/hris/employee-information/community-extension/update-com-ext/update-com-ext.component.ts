import { Component, OnInit } from '@angular/core';
import { Inject,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-update-com-ext',
  templateUrl: './update-com-ext.component.html',
  styleUrls: ['./update-com-ext.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateComExtComponent implements OnInit {

  activity
  date
  location
  idn
  statusid

  constructor(public dialogRef: MatDialogRef<UpdateComExtComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	public global: GlobalService,
  	private http: Http
  	) { 

  }

  ngOnInit() {
  	this.activity = this.data.selectedData.activity
  	this.location = this.data.selectedData.location
  	var sdate = new Date(this.data.selectedData.dateConducted);
    this.date=sdate;
    this.idn = this.data.idnum
     if (this.data.selectedData.statusID == 1||this.data.selectedData.statusID==null) {
      this.statusid = 1;
    }else
      this.statusid = this.data.selectedData.statusID
  }

  checked(){
    if (this.statusid==0) this.statusid=1
      else this.statusid=0
  }


  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  save(): void 
  {
     this.global.swalLoading('Updating Community Extension');
    this.http.put(this.global.api+'Employee/CommunityExtension/'+this.data.selectedCID,{
              "activity": this.activity,
              "dateConducted": this.date,
              "StatusID": this.statusid,
              "location": this.location,

            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  this.global.swalAlert(res.message,"",'success');
                                  this.dialogRef.close({result:"Update success"});    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
  }

}
