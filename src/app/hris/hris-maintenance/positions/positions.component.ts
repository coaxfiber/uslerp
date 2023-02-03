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
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  positionArr
  pname;
  JDescription
  JRequirements


  id;
  statusid;
  toggleStatus:boolean;
  editctr = 0;

  editstatus=0


  saveCTRL:boolean;
  editCTRL:boolean;

  updateTargetID='';

  options: string[]=[];

  constructor(public dialog: MatDialog,private domSanitizer: DomSanitizer,private global: GlobalService,private http: Http) { }

  ngOnInit() {
  	this.saveCTRL = false;
  	this.editCTRL = true;
  	this.toggleStatus = false;
  	this.statusid = 0;
  	this.populateTable();
  }

  populateTable(){
  	this.http.get(this.global.api+'HRISMaintenance/PositionList',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.positionArr = res.data;
	   //console.table(res.data)
	   for (var i = 0; i < this.positionArr.length; ++i) {
	        this.options.push(this.positionArr[i].departmentName)
	    }
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

  addPost(){
  	this.pname = '';
  	this.JDescription = '';
  	this.JRequirements = '';

  	this.editctr = 1;
	this.editstatus=1


  	this.saveCTRL = true;
	this.editCTRL = false;
	this.toggleStatus = true;	
  }

  deletePost(){
  	 //console.log(this.updateTargetID)
  	 const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'HRISMaintenance/DeletePosition/'+parseInt(this.updateTargetID),this.global.option)
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

  SavePost(){
  	if(this.editstatus == 1)
  	{
  		//adding position
  		this.global.swalLoading('');
	    this.http.post(this.global.api+'HRISMaintenance/InsertPosition',{
	              "position": this.pname,
	              "jobDescription": this.JDescription,
	              "jobRequirements": this.JRequirements,
	              "active": this.statusid,
	              
	            },this.global.option)
	                                .map(response => response.json())
	                                .subscribe(res => {
	                                  console.log(res)
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

  		this.global.swalLoading('Updating Position Details');
	    this.http.put(this.global.api+'HRISMaintenance/UpdatePosition/'+this.updateTargetID,{

	              "position": this.pname,
	              "jobDescription": this.JDescription,
	              "jobRequirements": this.JRequirements,
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

  	this.pname = '';
  	this.JDescription = '';
  	this.JRequirements = '';

  	this.saveCTRL = false;
    this.editCTRL = true;
  }


  getpostinfo(pinfo){
  	this.pname = pinfo.position;
  	this.JDescription = pinfo.jobDescription;
  	this.JRequirements = pinfo.jobRequirements;
  	this.statusid = pinfo.active;
  	this.updateTargetID = pinfo.positionID;

  	//console.log(this.JDescription+'--'+this.JRequirements)
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
