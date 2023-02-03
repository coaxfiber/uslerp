import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';

@Component({
  selector: 'app-curriculum-subject-type-add',
  templateUrl: './curriculum-subject-type-add.component.html',
  styleUrls: ['./curriculum-subject-type-add.component.scss']
})
export class CurriculumSubjectTypeAddComponent implements OnInit {
id=''
arraysubtype
constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<CurriculumSubjectTypeAddComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

  progid=''
  subjectTypeId=''
  gradeNotLowerThan=0
  retake=0
  retake_GradeNotLowerThan=0

  ngOnInit() {
  		this.http.get(this.global.api+'/Curriculum/SubjectType',this.global.option)         .map(response => response.json())
          .subscribe(res => {
              this.arraysubtype=res.data;
              console.log(res.data)
          },Error=>{
            console.log(Error)
          });

          this.progid = this.data.pid
  	if (this.data.data==1) {
  		this.subjectTypeId = this.data.array.subjectTypeId
  		this.gradeNotLowerThan = this.data.array.gradeNotLowerThan
  		this.retake = this.data.array.retake
  		this.retake_GradeNotLowerThan = this.data.array.retake_GradeNotLowerThan
  		this.id = this.data.array.id
  	}
  }

	close(){
       this.dialogRef.close({result:'cancel'});
	}
  retentionpolicystpost(){
  	var y = ''
              if (this.subjectTypeId=='') {
                y=y+"*Subject Type Required!<br>"
              }
              console.log(this.progid)
              if (y!='') {
                this.global.swalAlert("Field Required Alert!",y,"warning")
              }else{ this.global.swalLoading('')
              this.http.post(this.global.api+'Curriculum/CurriculumRetentionPolicySubjectType',{
                      "programId": this.progid,
					  "subjectTypeId": this.subjectTypeId,
					  "gradeNotLowerThan": this.gradeNotLowerThan,
					  "retake": this.retake,
					  "retake_GradeNotLowerThan": this.retake_GradeNotLowerThan
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
   retentionpolicystput(){
  	var y = ''
              if (this.subjectTypeId=='') {
                y=y+"*Subject Type Required!<br>"
              }
              if (y!='') {
                this.global.swalAlert("Field Required Alert!",y,"warning")
              }else{ this.global.swalLoading('')
              this.http.put(this.global.api+'Curriculum/CurriculumRetentionPolicySubjectType/'+this.id,{
                      "programId": this.progid,
					  "subjectTypeId": this.subjectTypeId,
					  "gradeNotLowerThan": this.gradeNotLowerThan,
					  "retake": this.retake,
					  "retake_GradeNotLowerThan": this.retake_GradeNotLowerThan
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
