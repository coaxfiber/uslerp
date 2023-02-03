import { Component, OnInit } from '@angular/core';
import { Inject,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-elig',
  templateUrl: './add-elig.component.html',
  styleUrls: ['./add-elig.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEligComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEligComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	private global: GlobalService,
  	private http: Http
  	) { 

  }

  exam
  rating
  date
  lnumber
  edate
  ngOnInit() {
  }

  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }
  
  save(): void {
    //console.log(this.data.selectedID);
 	  this.global.swalLoading('Adding Eligibility');
    this.http.post(this.global.api+'Employee/Eligibility/'+this.data.selectedID,{
              "examination": this.exam,
              "datepassed": this.date,
              "rating": this.rating,
              "expirationDate": this.edate,
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  this.global.swalClose();
                                  //this.global.swalAlert(res.message,"",'success');
                                  this.dialogRef.close({result:"Adding Success"});    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
  }
}
