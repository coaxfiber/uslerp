import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddCurriculumComponent } from './add-curriculum/add-curriculum.component';
import { RetentionPolicyComponent } from './retention-policy/retention-policy.component';
import { CurriculumSubjectTypeComponent } from './curriculum-subject-type/curriculum-subject-type.component';

import Swal from 'sweetalert2';
const swal = Swal;
@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

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

  constructor(public global: GlobalService,private http: Http,public dialog: MatDialog,) { }

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
            if (res.data!=null) { 
              this.arrayprogstatus=res.data;
            }
            //console.log(res.data)
          },Error=>{
            console.log(Error)
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

  addfilter(){
  }
  clear(){
    this.resetvals()
    this.findby = ''
    this.string = ''
    this.exactMatch = false;
              this.tableArr = [];
              this.tabledata = undefined
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



   searchlookup(incre=null){
   	this.x=0
   	this.tableArr = undefined;
        this.http.post(this.global.api+'Curriculum/Lookup',
	    	{
	    	  "ProgramId": this.programId,
  			  "CourseCode": this.courseCode,
  			  "ProgramTitle": this.programTitle,
  			  "Major": this.major,
  			  "Version": this.version,
  			  "DepartmentId": this.departmentId,
  			  "DepartmentCode": this.departmentCode,
  			  "DepartmentName": this.departmentName,
  			  "DepartmentGroup": this.departmentGroup,
  			  "StatusCode": this.statusCode,
  			  "ExactMatch": this.exactMatch
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
                  if (incre!=null) {
                    this.filterall('onoutfocus')
                  }
                }
              }
	          },Error=>{
   				    this.tableArr = [];
	            this.global.swalAlertError();
	          });
   }

openDialogaddcurriculum(x,a): void {
    const dialogRef = this.dialog.open(AddCurriculumComponent, {
          width: '700px', disableClose: false, data:{data:x,array:a}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='saved') {
              this.searchlookup()
            }
            if (result.result=='updated') {
              this.searchlookup(1)

            }
          }
        });
    }

openDialogretentionpolicy(x,a): void {
    const dialogRef = this.dialog.open(RetentionPolicyComponent, {
          width: '900px', disableClose: false, data:{data:x}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='saved') {
              this.resetvals()
              this.findby = 'programId'
              this.programId = result.data
              this.string = result.data
              this.programId = result.data
              this.exactMatch = true
              this.searchlookup()
            }
          }
        });
    }
openDialogsubjecttype(x): void {
    const dialogRef = this.dialog.open(CurriculumSubjectTypeComponent, {
          width: '900px%', disableClose: false, data:{data:x}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='saved') {
            }
          }
        });
    }


  removecurriculum(id){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove Curriculum','Curriculum has been Removed','','sy',id);
  }
  
  swalConfirm(title,text,type,button,d1,d2,remove,id)
  {
    swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
          if (remove=='sy') {
            this.http.delete(this.global.api+'Curriculum/'+id,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message)

                this.string = '';
                this.searchlookup()
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
  }

}
