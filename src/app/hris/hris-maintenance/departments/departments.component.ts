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
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departmentArr;
  dname;
  dhead;
  id;
  statusid;
  toggleStatus:boolean;
  editctr = 0;

  editstatus=0


  saveCTRL:boolean;
  editCTRL:boolean;

  options: string[]=[];
  arrayDnames;
  departmentnames;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;


  updateTargetID='';

  @ViewChild("dnamefocus") dnameField: ElementRef;


  constructor(public dialog: MatDialog,private domSanitizer: DomSanitizer,private global: GlobalService,private http: Http) {
  	//console.log("asd")
  }

  ngOnInit() {
  	this.saveCTRL = false;
  	this.editCTRL = true;
  	this.toggleStatus = false;
  	this.statusid = 0;
  	this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.populateTable();

    
  }

  populateTable(){
  	this.http.get(this.global.api+'HRISMaintenance/Department',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.departmentArr = res.data;
	   //console.table(res.data)
	   for (var i = 0; i < this.departmentArr.length; ++i) {
	        this.options.push(this.departmentArr[i].departmentName)
	    }
	  },Error=>{
	    this.global.swalAlertError();
	  });
  }

  focusDname(){
  	this.dnameField.nativeElement.focus();
  	// console.log("pumasok na")
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  
  getdeptinfo(dinfo){
  	//console.log(dinfo.departmentName)
  	this.myControl.setValue(dinfo.departmentName);
  	this.dname = dinfo.departmentName;
  	this.dhead = dinfo.departmentHead;
  	this.statusid = dinfo.active;
  	this.updateTargetID = dinfo.departmentID;
  	this.id = dinfo.employeeId;
  }

  checked(){
    if (this.statusid==0){
    	this.statusid=1
    }
    else{
    	this.statusid=0
    }

  }


  addDept(){
  	this.dname = '';
  	this.dhead = '';

  	this.editctr = 1;
    this.editstatus = 1;
  	this.setfocus();

  	this.saveCTRL = true;
	  this.editCTRL = false;
	  this.toggleStatus = true;	
  }


  setfocus(){
  	//this.focusDhead();
	this.focusDname();
  }

  changeEditCtr(){
  		
	//<processess to edit>
	this.editctr = 1;
  this.editstatus = 0;
	this.toggleStatus = true;
	this.saveCTRL = true;
	this.editCTRL = false;
	this.setfocus()
  }
  
  deleteDept(){
  	 // console.log(this.updateTargetID)
  	 const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'HRISMaintenance/DeleteDepartment/'+parseInt(this.updateTargetID),this.global.option)
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

  SaveEdit(){
  	if(this.editstatus == 1)
  	{
  		//adding department
  		this.global.swalLoading('');
	    this.http.post(this.global.api+'HRISMaintenance/InsertDepartment',{
	              "departmentName": this.dname,
	              "departmentHead": this.id,
	              "active": this.statusid,
	              "initials": "",
	              
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

  		//department update

  		this.global.swalLoading('Updating Department Details');
	    this.http.put(this.global.api+'HRISMaintenance/UpdateDepartment/'+this.updateTargetID,{

	              "departmentName": this.dname,
	              "departmentHead": this.id,
	              "active": parseInt(this.statusid),
	              "initials": "",
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
  	this.dname = '';
  	this.dhead = '';

  	this.saveCTRL = false;
    this.editCTRL = true;

  	this.setfocus();
  }

  employeelookup(){
  	const dialogRef = this.dialog.open(EmployeeLookupComponent, {
          width: '600px', disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
            this.id = result.result;
            this.dhead = result.hname;
            //console.log(this.id)
          }
        });
  }



}
