import { Component,ViewChild, OnInit,ElementRef } from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';
import { EmployeeLookupComponent } from './../../../academic/lookup/employee-lookup/employee-lookup.component';
import { ConfirmationDialogComponent } from './../../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.css']
})
export class RanksComponent implements OnInit {


  rankArr
  rname;
  id;
  statusid;
  toggleStatus:boolean;
  editctr = 0;
  editstatus=0
  saveCTRL:boolean;
  editCTRL:boolean;
  updateTargetID='';

  constructor(public dialog: MatDialog,private domSanitizer: DomSanitizer,private global: GlobalService,private http: Http) { }

  ngOnInit() {
  	this.saveCTRL = false;
  	this.editCTRL = true;
  	this.toggleStatus = false;
  	this.statusid = 0;
  	this.populateTable();
  }

  populateTable(){
  	this.http.get(this.global.api+'HRISMaintenance/RankList',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.rankArr = res.data;
	  },Error=>{
	    this.global.swalAlertError();
	  });
  }

  changeEditCtr(){
  		
	//<processess to edit>
	this.editstatus=0
	this.editctr = 1;
	this.toggleStatus = true;
	this.saveCTRL = true;
	this.editCTRL = false;
  }

  addRank(){
  	this.rname = '';

  	this.editctr = 1;
	this.editstatus=1


  	this.saveCTRL = true;
	this.editCTRL = false;
	this.toggleStatus = true;	
  }

  deleteRank(){
  	 //console.log(this.updateTargetID)
  	 const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'HRISMaintenance/DeleteRank/'+parseInt(this.updateTargetID),this.global.option)
            .map(response => response.json())
            .subscribe(res => {

                this.global.swalAlert("Success","",'success');

                this.CancelEdit();
	            this.populateTable();
              
            },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      //console.log(Error)
            });
          }
          else{

          }
        });
  }

  SaveRank(){
  	if(this.editstatus == 1)
  	{
  		//adding position
  		this.global.swalLoading('');
	    this.http.post(this.global.api+'HRISMaintenance/InsertRank',{
	              "rank": this.rname,
	              "active": this.statusid,
	              
	            },this.global.option)
	                                .map(response => response.json())
	                                .subscribe(res => {
	                                  // console.log(res)
	                                  this.global.swalClose();
	                                  this.global.swalAlert("Success","",'success');  
	                                  //this.global.swalAlert(res.message,"",'success');
	                                  //this.dialogRef.close({result:"Adding Success"});
	                                  //console.log("insert success");
	                                  this.CancelEdit();
	                                  this.populateTable();
	                                },Error=>{
	                                  this.global.swalAlertError();
	                                  console.log(Error)
	                                });
  	}
  	else{

  		//position update

  		this.global.swalLoading('Updating Rank Details');
	    this.http.put(this.global.api+'HRISMaintenance/UpdateRank/'+this.updateTargetID,{

	              "rank": this.rname,
	              "active": parseInt(this.statusid),
	            },this.global.option)
	                                .map(response => response.json())
	                                .subscribe(res => {
	                                  // console.log(res)
	                                  this.global.swalAlert("Success","",'success');
	                                  this.CancelEdit();
	                                  this.populateTable(); 
	                                },Error=>{
	                                  this.global.swalAlertError();
	                                  console.log(Error)
	                                });
  	}
  	
  }

  CancelEdit(){
  	this.editctr = 0;
  	this.statusid = 0;
  	this.toggleStatus = false;

  	this.rname = '';

  	this.saveCTRL = false;
    this.editCTRL = true;
  }


  getrankinfo(pinfo){
  	this.rname = pinfo.rank;
  	this.statusid = pinfo.active;
  	this.updateTargetID = pinfo.rankID;
  }



  checked(){
    if (this.statusid==0){
    	this.statusid=1
    }
    else{
    	this.statusid=0
    }

  }



}
