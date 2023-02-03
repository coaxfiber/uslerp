import { Component, OnInit } from '@angular/core';
import { Inject,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import { ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

	classificationsArr;
	selectedClass;
	sdate;
	edate;
	active = 1;
	targetupdateID;
	description;

  constructor(public dialogRef: MatDialogRef<ContractsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private global: GlobalService,
    private http: Http,
    private fb: FormBuilder,
    private httpC: HttpClient,) {

  		this.global.swalLoading('Loading appointment resources')
	  	this.http.get(this.global.api+'HRISMaintenance/Classifications',this.global.option)
		  .map(response => response.json())
		  .subscribe(res => {
		   this.classificationsArr = res.data;

			this.global.swalClose();
		  },Error=>{
		    this.global.swalAlertError();
		  });
    }

  ngOnInit() {

  	if(this.data.type == "update"){
  		
  		this.targetupdateID = this.data.selectedData.contractid;
  		var sd = new Date(this.data.selectedData.startdate);
	  	var ed = new Date(this.data.selectedData.enddate);
	  	this.sdate = sd;
	  	this.edate = ed;
	  	this.selectedClass = this.data.selectedData.termsOfContract
     //console.log(this.selectedClass);
	  	this.description = this.data.selectedData.description;
	  	if(this.data.selectedData.active == "False")
  			this.active = 0;
  		else
  			this.active = 1;
  	}
  }

  checked(){
    if (this.active==0){
    	this.active=1
    }
    else{
    	this.active=0
    }
  }

  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }
  

  save(): void {

    if(this.data.type == "update"){
    	// console.log('sdate:'+this.sdate+"--"+'edate:'+this.edate);
    	this.global.swalLoading('Updating Contract');
	    this.http.put(this.global.api+'Employee/Contract/'+this.targetupdateID,{
	              "sdate": this.sdate,
	              "edate": this.edate,
	              "classification": this.selectedClass,
	              "description": this.description,
	              "active": this.active,
	            },this.global.option)
	                                .map(response => response.json())
	                                .subscribe(res => {
	                                  // console.log(res)
	                                  //this.global.swalClose();
	                                  this.global.swalAlert("Success","",'success');
	                                  this.dialogRef.close({result:"Update success"});    

	                                },Error=>{
	                                  this.global.swalAlertError();
	                                  console.log(Error)
	                                });

    }else{

	 	this.global.swalLoading('Adding Contract');
	    this.http.post(this.global.api+'Employee/Contract/'+this.data.selectedID,{
	              "sdate": this.sdate,
	              "edate": this.edate,
	              "classification": this.selectedClass,
	              "description": this.description,
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


}
