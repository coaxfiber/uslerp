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
  selector: 'app-rank-records',
  templateUrl: './rank-records.component.html',
  styleUrls: ['./rank-records.component.css']
})
export class RankRecordsComponent implements OnInit {

	targetupdateID;
	sy;
	rank;
	department;
	position;
	status;
	term;
	evaluation;
	recommendation;

	rankArr; deptArr; posArr; classArr; tocArr;

  constructor(public dialogRef: MatDialogRef<RankRecordsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private global: GlobalService,
    private http: Http,
    private fb: FormBuilder,
    private httpC: HttpClient,) { 

  	this.global.swalLoading('Loading appointment resources')
	  	this.http.get(this.global.api+'HRISMaintenance/RankList',this.global.option)
		  .map(response => response.json())
		  .subscribe(res => {
		    this.rankArr = res.data;

		    	this.global.swalLoading('Loading appointment resources')
			  	this.http.get(this.global.api+'HRISMaintenance/Department',this.global.option)
				  .map(response => response.json())
				  .subscribe(res => {
				    this.deptArr = res.data;

					  	this.http.get(this.global.api+'HRISMaintenance/PositionList',this.global.option)
						  .map(response => response.json())
						  .subscribe(res => {
						    this.posArr = res.data;

							  	this.http.get(this.global.api+'HRISMaintenance/Classifications',this.global.option)
								  .map(response => response.json())
								  .subscribe(res => {
								    this.classArr = res.data;

									  	this.http.get(this.global.api+'HRISMaintenance/EmpStatus',this.global.option)
										  .map(response => response.json())
										  .subscribe(res => {
										   this.tocArr = res.data;

										  },Error=>{
										    this.global.swalAlertError();
										  });

								  },Error=>{
								    this.global.swalAlertError();
								  });

						  },Error=>{
						    this.global.swalAlertError();
						  });

				  },Error=>{
				    this.global.swalAlertError();
				  });
				  
			this.global.swalClose();
		  },Error=>{
		    this.global.swalAlertError();
		  });
  }

  ngOnInit() {

  	if(this.data.type == "update"){
  		// console.log(this.data.selectedData.department)
  		this.sy = this.data.selectedData.sy;
  		this.rank = this.data.selectedData.rank;
  		this.department = this.data.selectedData.department;
  		this.position = this.data.selectedData.position;
  		this.status = this.data.selectedData.status;
  		this.term = this.data.selectedData.empStatusID;
  		this.evaluation = this.data.selectedData.evaluation;
  		this.recommendation = this.data.selectedData.recommendation;
  		this.targetupdateID = this.data.selectedData.evaluationid;
  	}

  }


  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }
  

  save(): void {

	    if(this.data.type == "update"){
	    	//console.log('sdate:'+this.sdate+"--"+'edate:'+this.edate);
	    	this.global.swalLoading('Rank-Record');
		    this.http.put(this.global.api+'Employee/Rank/'+this.targetupdateID+'?evaluationid='+this.targetupdateID,{
		              "sy": this.sy,
		              "rank": this.rank,
		              "department": this.department,
		              "position": this.position,
		              "status": this.status,
		              "term": this.term,
		              "evaluation": this.evaluation,
		              "recommendation": this.recommendation,
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

		 	this.global.swalLoading('Adding Rank-Record');
		    this.http.post(this.global.api+'Employee/Rank/'+this.data.selectedID,{
		              "sy": this.sy,
		              "rank": this.rank,
		              "department": this.department,
		              "position": this.position,
		              "status": this.status,
		              "term": this.term,
		              "evaluation": this.evaluation,
		              "recommendation": this.recommendation,
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
