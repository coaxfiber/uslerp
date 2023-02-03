import { Component, OnInit } from '@angular/core';
import { Inject,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-update-elig',
  templateUrl: './update-elig.component.html',
  styleUrls: ['./update-elig.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateEligComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateEligComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	private global: GlobalService,
  	private http: Http,
  	) { }

  exam
  rating
  date
  lnumber
  edate
  ngOnInit() {
    //console.log(this.data.selectedEID)
    this.exam=this.data.selectedData.examination;
    this.rating=this.data.selectedData.rating;
    var sdate = new Date(this.data.selectedData.datepassed);
    this.date=sdate;
    var d = new Date(this.data.selectedData.expirationDate);
    this.edate = d;
    this.lnumber=this.data.selectedData.licenseNumber;
  }

  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  save(): void 
  {
     this.global.swalLoading('Updating Eligibility');
    this.http.put(this.global.api+'Employee/Eligibility/'+this.data.selectedEID,{
              "examination": this.exam,
              "datepassed": this.date,
              "rating": this.rating,
              "licenseNumber": this.lnumber,
              "expirationDate": this.edate,
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  this.global.swalClose();
                                  //this.global.swalAlert(res.message,"",'success');
                                  this.dialogRef.close({result:"Update success"});    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
  }

}
