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
  selector: 'app-speaking-engagement',
  templateUrl: './speaking-engagement.component.html',
  styleUrls: ['./speaking-engagement.component.css']
})
export class SpeakingEngagementComponent implements OnInit {

  EmpID;
  ConferenceTitle="";
  EventOrganizer="";
  StartDate;
  EndDate;
  Venue="";

  type="";
  targetUpdateID="";

  rolesArr: string[]=[]
  addedRolesArr

  statusid = 0;

  SEID=null;
  RID=null;
  
  constructor(public dialogRef: MatDialogRef<SpeakingEngagementComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	public global: GlobalService,
  	private http: Http,
    private fb: FormBuilder,) { }

  ngOnInit() {
  	this.getRoles();
  	
  	this.type = this.data.type;
  	this.EmpID = this.data.selectedID;
  	this.targetUpdateID = this.data.selectedEID
  	if (this.type == "Update") {

  		if (this.data.selectedData.statusId == 1||this.data.selectedData.statusId==null) {
	      this.statusid = 1;
	    }else
      		this.statusid = this.data.selectedData.statusId

  		this.ConferenceTitle = this.data.selectedData.conferenceTitle;
  		this.EventOrganizer = this.data.selectedData.eventOrganizer;	
  		var sdate = new Date(this.data.selectedData.startDate);
  		var edate = new Date(this.data.selectedData.endDate);
  		this.StartDate = sdate;
  		this.EndDate = edate;
  		this.Venue = this.data.selectedData.venue;
  		this.getAddedRoles(this.targetUpdateID)
  	}
  }

  checked(){
    if (this.statusid==0) this.statusid=1
      else this.statusid=0
  }

  getRoles(){
  	this.http.get(this.global.api+'HRISMaintenance/SpeakingEngagementRoles',this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.rolesArr=res.data;
          
        },Error=>{
                  this.global.swalAlertError();
        });
  }
  getAddedRoles(id){
  	this.http.get(this.global.api+'Employee/SpeakingEngagementRole/'+id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.addedRolesArr=res.data;
         
        },Error=>{
                  this.global.swalAlertError();
        });
  }
  getRoleName(id){
  	
  	for (var i = this.rolesArr.length - 1; i >= 0; i--) {
  	 if (id==this.rolesArr[i]["id"]) {
  	 	return this.rolesArr[i]["name"];
  	 }
  	}
  }

  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }
  

  save(): void {
      if(this.type == "Update"){
      	this.global.swalLoading('');
  		this.http.put(this.global.api+'Employee/SpeakingEngagement/'+this.targetUpdateID,{
              "EmployeeId": this.EmpID,
              "ConferenceTitle": this.ConferenceTitle,
              "EventOrganizer": this.EventOrganizer,
              "StartDate": this.StartDate,
              "EndDate": this.EndDate,
              "Venue": this.Venue,
              "statusId": this.statusid,
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
      	this.http.post(this.global.api+'Employee/SpeakingEngagement/',{
              "EmployeeId": this.EmpID,
              "ConferenceTitle": this.ConferenceTitle,
              "EventOrganizer": this.EventOrganizer,
              "StartDate": this.StartDate,
              "EndDate": this.EndDate,
              "Venue": this.Venue,
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
addRole(){
    // if (this.RID != null) {
      this.http.post(this.global.api+'Employee/SpeakingEngagementRole',{
              "SpeakingEngagementId": this.targetUpdateID,
              "RoleId": this.RID
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  this.getAddedRoles(this.targetUpdateID);  
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
    // }
    // else{
    //   this.global.swalAlert("","Please select a role","warning");
    // }
    
  }
  removerole(id){
    if (this.RID != null) {
      this.http.delete(this.global.api+'Employee/SpeakingEngagementRole/'+id,this.global.option)
              .map(response => response.json())
            .subscribe(res => {
              this.getAddedRoles(this.targetUpdateID);   
            },Error=>{
                this.global.swalAlertError();
            });
            }
    else{
      this.global.swalAlert("","Please select a role","warning");
    }
  }

}
