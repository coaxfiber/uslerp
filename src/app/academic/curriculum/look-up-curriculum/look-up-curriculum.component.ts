import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Inject} from '@angular/core';
import Swal from 'sweetalert2';
const swal = Swal;
@Component({
  selector: 'app-look-up-curriculum',
  templateUrl: './look-up-curriculum.component.html',
  styleUrls: ['./look-up-curriculum.component.scss']
})
export class LookUpCurriculumComponent implements OnInit {

  findby

  programId=''
  courseCode=''
  programTitle=''
  major=''
  version=''
  departmentId=''
  departmentCode=''
  departmentName=''
  departmentGroup=''
  statusCode=''

  fprogramId=''
  fcourseCode=''
  fprogramTitle=''
  fmajor=''
  fversion=''
  fdepartmentId=''
  fdepartmentCode=''
  fdepartmentName=''
  fdepartmentGroup=''
  fstatusCode=''


  string=''
  exactMatch = false

  tableArr=[]
  tabledata
 	x
   arrayprogstatus
   arraydept
  constructor(public dialogRef: MatDialogRef<LookUpCurriculumComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http,public dialog: MatDialog,) { }

  ngOnInit() {
        // this.http.get(this.global.api+'Curriculum',this.global.option)
        //       .map(response => response.json())
        //       .subscribe(res => {
        //         console.log(res)
        //       },Error=>{
        //         this.global.swalAlertError();
        //       });
         this.http.get(this.global.api+'/Curriculum/ProgramStatus',this.global.option)         .map(response => response.json())
          .subscribe(res => { 
              this.arrayprogstatus=[]
            if (res.data!=null) { 
              this.arrayprogstatus=res.data;
            }
            //console.log(res.data)
          },Error=>{
            console.log(Error)
              this.arrayprogstatus=[]
          });

          this.http.get(this.global.api+'/PublicAPI/Departments',this.global.option)         .map(response => response.json())
          .subscribe(res => {
              this.arraydept=res;
          },Error=>{
            console.log(Error)
          });
  }


  keyDownFunction(event){
		    if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
		      this.checkfilter();
		    }
        }

  select(x){
       this.dialogRef.close({result:x});
  }

   close(): void {
       this.dialogRef.close({result:'cancel'});
  }

  resetvals(){

	  this.programId=''
	  this.courseCode=''
	  this.programTitle=''
	  this.major=''
	  this.version=''
	  this.departmentId=''
	  this.departmentCode=''
	  this.departmentName=''
	  this.departmentGroup=''
	  this.statusCode=''

	  this.fprogramId=''
	  this.fcourseCode=''
	  this.fprogramTitle=''
	  this.fmajor=''
	  this.fversion=''
	  this.fdepartmentId=''
	  this.fdepartmentCode=''
	  this.fdepartmentName=''
	  this.fdepartmentGroup=''
	  this.fstatusCode=''
  }

  checkfilter(){
  	this.resetvals()
  	if (this.findby == 'programId') {
  		this.programId = this.string
  	}else
  	if (this.findby == 'courseCode') {
  		this.courseCode = this.string
  	}else
  	if (this.findby == 'programTitle') {
  		this.programTitle = this.string
  	}else
  	if (this.findby == 'major') {
  		this.major = this.string
  	}else
  	if (this.findby == 'version') {
  		this.version = this.string
  	}else
  	if (this.findby == 'departmentId') {
  		this.departmentId = this.string
  	}else
  	if (this.findby == 'departmentCode') {
  		this.departmentCode = this.string
  	}else
  	if (this.findby == 'departmentName') {
  		this.departmentName = this.string
  	}else
  	if (this.findby == 'departmentGroup') {
  		this.departmentGroup = this.string
  	}else
  	if (this.findby == 'statusCode') {
  		this.statusCode = this.string
  	}
  	this.searchlookup()
  }


  	filterall(event){
 		if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
  		    var filter = {
			  programId: this.fprogramId,
			  courseCode: this.fcourseCode,
			  programTitle: this.fprogramTitle,
			  major: this.fmajor ,
			  version: this.fversion ,
			  departmentId: this.fdepartmentId ,
			  departmentCode: this.fdepartmentCode ,
			  departmentName: this.fdepartmentName ,
			  departmentGroup: this.fdepartmentGroup ,
			  statusCode: this.fstatusCode
			};
            var users = this.tableArr

			users= users.filter(function(item) {
					
			  for (var key in filter) {
			    if (!item[key].toUpperCase().includes(filter[key].toUpperCase()))
			      return false;
			  }
			  return true;

			});
			this.tabledata = users
		    }
  		
		}



   searchlookup(){
   	this.x=0
   	this.tableArr = undefined;
        this.http.post(this.global.api+'Curriculum/Lookup',
	    	{
	    	  "programId": this.programId,
			  "courseCode": this.courseCode,
			  "programTitle": this.programTitle,
			  "major": this.major,
			  "version": this.version,
			  "departmentId": this.departmentId,
			  "departmentCode": this.departmentCode,
			  "departmentName": this.departmentName,
			  "departmentGroup": this.departmentGroup,
			  "statusCode": this.statusCode,
			  "exactMatch": this.exactMatch
	    	}
	    	,this.global.option)
	          .map(response => response.json())
	          .subscribe(res => {
	           //console.log(res.data)
              this.tableArr = []
              this.tabledata = []
              for (var i = 0; i < res.data.length; ++i) {
                if (this.global.checkdomain(res.data[i].departmentId)) {
                  this.tableArr.push(res.data[i])
                  this.tabledata.push(res.data[i])
                }
                // code...
              }
	          },Error=>{
   				    this.tableArr = [];
	            this.global.swalAlertError();
	          });
   }
}
