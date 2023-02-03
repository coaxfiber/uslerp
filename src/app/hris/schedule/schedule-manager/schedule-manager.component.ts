import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import {FormBuilder, FormGroup} from '@angular/forms';
import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ViewChild,ElementRef } from '@angular/core';
import { ModifyScheduleComponent } from './../pop-ups/modify-schedule/modify-schedule.component';

import { EmployeeLookupComponent } from './../../../academic/lookup/employee-lookup/employee-lookup.component';

import { ConfirmationDialogComponent } from './../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-schedule-manager',
  templateUrl: './schedule-manager.component.html',
  styleUrls: ['./schedule-manager.component.css']
})
export class ScheduleManagerComponent implements OnInit {

	image;
	signature;
	name;
	position;
	idnumber;
	dtridnum;
	id;
  dtr;

	showContent;

  scheduleArr
  updateDataArr


  constructor(public dialog: MatDialog,
  	private domSanitizer: DomSanitizer,
  	private global: GlobalService,
  	private http: Http, ) { }

  ngOnInit() {


  }

  keyDownFunction(event) {
    
    if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') 
    {
      
      if (this.id != '') 
      {
        this.getBasicEmpInfo();
        // console.log("1st")  
      }
      else
      {
        this.showContent = false;
      }
    // code...
    }
  }

  getBasicEmpInfo(){
    // console.log("2nd")
    this.global.swalLoading('Loading employee schedule.');
  	this.http.get(this.global.api+'Employee/'+this.id,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            //console.log(res);
            
            if (res.message != "IDNumber does not exist.") {
              this.showContent = true;
              this.name = res.data[0].fullname;
              this.position = res.data[0].position;
              this.idnumber=res.data[0].idnumber;
              this.dtridnum="DTR ID#: "+res.data[0].dtrid;
              this.dtr = res.data[0].dtrid;
              this.getSchedule();
            }else{
              //console.log('1111')
              this.clear();
              this.global.swalAlert("Employee not found",'','warning');
            }
          },Error=>{
            this.clear();
            this.global.swalAlertError();
          });
  }

  getSchedule(){
    this.http.get(this.global.api+'Employee/Schedule/'+this.id,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            if (res.data!=null) { 
              this.scheduleArr=res.data;
              this.global.swalClose();
            }
            //console.log(res.data)
          },Error=>{
            console.log(Error)
          });
  }


  employeelookup(): void {
    // console.log("2nd")
        const dialogRef = this.dialog.open(EmployeeLookupComponent, {
          width: '600px', disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
            this.id = result.result;
            this.keyDownFunction('onoutfocus')
          }
        });
        
  }
  addEntry(){
    // console.log(this.dtr)
    const dialogRef = this.dialog.open(ModifyScheduleComponent, {
          width: '600px', disableClose: false,data:{dtrid:this.dtr,selectedData:"",type:"Add"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
              this.getSchedule();
          }
        });
  }
  updateEntry(){
    const dialogRef = this.dialog.open(ModifyScheduleComponent, {
          width: '600px', disableClose: false,data:{dtrid:this.dtr,selectedData:this.updateDataArr,type:"Update",targetID:this.updateDataArr.scheduleId}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
              this.getSchedule();
          }
        });
  }

  deleteEntry(){
     const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'Employee/Schedule/'+parseInt(this.updateDataArr.scheduleId),this.global.option)
            .map(response => response.json())
            .subscribe(res => {

                this.global.swalAlert("Success","",'success');
                this.getSchedule();
              
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



  setUpdateData(udata){
    this.updateDataArr = udata;
  }
  

  clear(){
  	this.image = 'assets/noimage.jpg';
    
    this.signature = 'assets/nosignature.jpg';
    this.name = '';
    this.position = '';
    this.id = '';
    this.idnumber='';
    this.dtridnum='';
  }

}
