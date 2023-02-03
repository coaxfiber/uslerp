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
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

	selectedDept
	selecteditem

  deptArr
  itemArr

  targetupdateID
  itemid
  dateappointed
  
  sdate
  edate
  active
  statusid

  constructor(public dialogRef: MatDialogRef<AppointmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private global: GlobalService,
    private http: Http,
    private fb: FormBuilder,
    private httpC: HttpClient,) {

  	this.global.swalLoading('Loading appointment resources')
  	this.http.get(this.global.api+'HRISMaintenance/Department',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.deptArr = res.data;

		this.global.swalClose();
	  },Error=>{
	    this.global.swalAlertError();
	  });

     }

  ngOnInit() {
  	this.statusid = 0
  	if(this.data.type == "update"){


      this.selectedDept = this.data.selectedData.departmentID;
      this.getItem(this.selectedDept);
      this.selecteditem = this.data.selectedData.itemID
      
      // console.log( this.selectedDept+'-'+this.selecteditem)
  		
      this.targetupdateID = this.data.selectedData.appointmentID;
  		this.itemid = this.data.selectedData.itemID;
  		this.statusid = this.data.selectedData.hasEffectivity;
  		var sd = new Date(this.data.selectedData.startdate);
	  	var ed = new Date(this.data.selectedData.enddate);
	  	var da = new Date(this.data.selectedData.dateAppointed);
	  	this.sdate = sd;
	  	this.edate = ed;
  		this.dateappointed = da;
  		this.active = this.data.selectedData.active;

  		
  	}
  }

  checked(){
    if (this.statusid==0){
    	this.statusid=1
    }
    else{
    	this.statusid=0
    }

  }

  getItem(item){
  	this.http.get(this.global.api+'HRISMaintenance/Items/?departmentId='+item+'&employeeId='+this.data.selectedID,this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.itemArr = res.data;

	  },Error=>{
	    this.global.swalAlertError();
	  });
  }
  
  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }
  

  save(): void {
    /*
    if(this.identifier == '1')
      this.recordschname = this.usersForm.get('userInput').value
    else
      this.recordschname = this.selectedSchName;
    */
    //console.log(this.selectedDept+'--'+this.selectedPost+'--'+this.selectedClass+'--'+this.selectedRept)

    if(this.data.type == "update"){


    	this.global.swalLoading('Updating Appointment');
	    this.http.put(this.global.api+'Employee/Appointment/'+this.targetupdateID,{
	              "itemid": this.selecteditem,
	              "dateappointed": this.dateappointed,
	              "expiring": this.statusid,
	              "sdate": this.sdate,
	              "edate": this.edate,
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

        //console.log(this.data.selectedID+'--'+this.itemid+'--'+this.dateappointed+'--'+this.expiring+'--'+this.sdate+'--'+this.edate)
        if(this.statusid==0)
        {
        	this.sdate = this.dateappointed;
        	this.edate = "";
        }

	 	this.global.swalLoading('Adding Appointment');
	    this.http.post(this.global.api+'Employee/Appointment/'+this.data.selectedID,{
	              "itemid": this.selecteditem,
	              "dateappointed": this.dateappointed,
	              "expiring": this.statusid,
	              "sdate": this.sdate,
	              "edate": this.edate,
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
