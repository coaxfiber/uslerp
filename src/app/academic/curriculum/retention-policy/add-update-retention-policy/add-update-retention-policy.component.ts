import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import Swal from 'sweetalert2';
const swal = Swal;

@Component({
  selector: 'app-add-update-retention-policy',
  templateUrl: './add-update-retention-policy.component.html',
  styleUrls: ['./add-update-retention-policy.component.scss']
})
export class AddUpdateRetentionPolicyComponent implements OnInit {
averageNotLowerThan=''
gradeNotLowerThan=''  
id
programId
semester=''
statusId=''
statusName
yearLevel=''

year1
year2
arraysubtype
subtype=''
constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<AddUpdateRetentionPolicyComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }


  ngOnInit() {
          this.http.get(this.global.api+'/Curriculum/SubjectType',this.global.option)         .map(response => response.json())
          .subscribe(res => {
              this.arraysubtype=res.data;
          },Error=>{
            console.log(Error)
          });
  	if (this.data.data==1) {
	  	this.averageNotLowerThan=this.data.array.averageNotLowerThan
  		this.gradeNotLowerThan=this.data.array.gradeNotLowerThan
  		this.id=this.data.array.id.toString()
  		this.programId=this.data.array.programId
      this.subtype=this.data.array.exemptedSubjectTypeId.toString()

  		this.semester=this.data.array.semester.toString()
  		this.statusId=this.data.array.statusId.toString()
  		this.statusName=this.data.array.statusName
  		this.yearLevel=this.data.array.yearLevel.toString()
		if (this.data.array.effectiveSchoolYear!='') {
			this.year1 = parseInt(this.data.array.effectiveSchoolYear.substring(0,4))
			this.year2 = this.year1 + 1
		}
  	}
  }

	close(){
       this.dialogRef.close({result:'cancel'});
	}


  yearchange1(){
    if (this.year1==0||this.year1==null) {
      // code...
      }else
       this.year2=this.year1+1;
     }
     yearchange2(){
      if (this.year2==0||this.year2==null) {
      // code...
      }else
       this.year1=this.year2-1;
     }

  retentionpolicypost(){
     var y = ''
     var sy=''
       if (this.year1!=null||this.year1!=undefined) {
       if (this.year1<1900||this.year2>2999)
         y=y+"*Must Enter Appropriate School Year";
       else
         sy=this.year1.toString()+this.year2.toString().substring(2,4)
       }
               var subtype
              if (this.subtype=='') {
                subtype=0
              }else{
                subtype=parseInt(this.subtype)
              }

              if (this.yearLevel == '') {
                y=y+"*Year Level is Required!<br>"
              }
              if (this.semester == '') {
                y=y+"*Semester is Required!<br>"
              }
              if (y!='') {
                this.global.swalAlert("Field Required Alert!",y,"warning")
              }else{ this.global.swalLoading('')
              this.http.post(this.global.api+'Curriculum/RetentionPolicy',{
                   "programId": this.data.pid,
                    "averageNotLowerThan": this.averageNotLowerThan,
                    "gradeNotLowerThan": this.gradeNotLowerThan,
                    "yearLevel": parseInt( this.yearLevel),
                    "semester": parseInt(this.semester),
                    "effectiveSchoolYear": sy,
                    "exemptedSubjectTypeId": subtype
               },this.global.option)
                      .map(response => response.json())
              .subscribe(res => {
                this.global.swalClose();
                this.global.swalSuccess(res.message)
       			this.dialogRef.close({result:'success'});
                //this.dialogRef.close({result:'saved',data:this.progid});
              },Error=>{
                console.log(Error)
                this.global.swalAlertError()
              });}
         
  }    
  retentionpolicyput(){
     var y = ''
     var sy=''
       if (this.year1!=null||this.year1!=undefined) {
       if (this.year1<1900||this.year2>2999)
         y=y+"*Must Enter Appropriate School Year";
       else
         sy=this.year1.toString()+this.year2.toString().substring(2,4)
       }
              var subtype
              if (this.subtype=='') {
                subtype=0
              }else{
                subtype=parseInt(this.subtype)
              }
              if (this.averageNotLowerThan == undefined ||this.averageNotLowerThan == null) {
                y=y+"*Average is Required!<br>"
              }
              if (this.gradeNotLowerThan == undefined||this.gradeNotLowerThan == null) {
                y=y+"*Grade is Required!<br>"
              }
              if (this.yearLevel == '') {
                y=y+"*Year Level is Required!<br>"
              }
              if (this.semester == '') {
                y=y+"*Semester is Required!<br>"
              }
              if (y!='') {
                this.global.swalAlert("Field Required Alert!",y,"warning")
              }else{ this.global.swalLoading('')

              	//console.log(this.statusId)
              this.http.put(this.global.api+'Curriculum/RetentionPolicy/'+this.id,{
                    "averageNotLowerThan": this.averageNotLowerThan,
                    "gradeNotLowerThan": this.gradeNotLowerThan,
        					  "yearLevel":  parseInt( this.yearLevel),
        					  "semester": parseInt(this.semester),
        					  "effectiveSchoolYear": sy,
        					  "status": parseInt(this.statusId),
                    "exemptedSubjectTypeId": subtype
               },this.global.option)
                      .map(response => response.json())
              .subscribe(res => {
                this.global.swalClose();
                this.global.swalSuccess(res.message)
       			this.dialogRef.close({result:'success'});
                //this.dialogRef.close({result:'saved',data:this.progid});
              },Error=>{
                console.log(Error)
                this.global.swalAlertError()
              });}         
  }    
}
