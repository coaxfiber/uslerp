import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import Swal from 'sweetalert2';
const swal = Swal;

@Component({
  selector: 'app-add-update-subjects',
  templateUrl: './add-update-subjects.component.html',
  styleUrls: ['./add-update-subjects.component.scss']
})
export class AddUpdateSubjectsComponent implements OnInit {

  progid=''
  progtitle=''

  subjectId=''
  subjectTitle=''

  department=''
  subtype=''
  hours=''
  labType=''
  lfr=''
  tfr=''
  labUnits=''
  lecUnits=''
  term=''
  yearlevel=''
  arraydept
  arraysubtype

  recordid
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<AddUpdateSubjectsComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }


  ngOnInit() {
    this.progid = this.data.curr.programId
  	this.progtitle = this.data.curr.courseCode + " - " + this.data.curr.programTitle
          this.http.get(this.global.api+'/PublicAPI/Departments',this.global.option)         .map(response => response.json())
          .subscribe(res => {
              this.arraydept=res;
          },Error=>{
            console.log(Error)
          });
          this.http.get(this.global.api+'/Curriculum/SubjectType',this.global.option)         .map(response => response.json())
          .subscribe(res => {
              this.arraysubtype=res.data;
          },Error=>{
            console.log(Error)
          });

  	if (this.data.data==0) {
  		// code...
  	}else{
       this.http.get(this.global.api+'Curriculum/Subject/'+this.data.array.recordId,this.global.option)         .map(response => response.json())
          .subscribe(res => {
              this.subjectId = res.data.subjectId
              if (res.data.subjectTypeId!=null) {
                this.subtype = res.data.subjectTypeId
              }
              this.subjectTitle =res.data.subjectTitle
              this.recordid=res.data.recordId
              this.hours=res.data.hours
              this.labUnits=res.data.labUnits
              this.lecUnits=res.data.lecUnits
              this.term=res.data.term
              this.yearlevel=res.data.yearLevel
              this.department=res.data.loadingDeptId
          });
  	}
  }
	close(){
       this.dialogRef.close({result:'cancel'});
	}
  subpost(){
    {
          var y = ''
              if (this.yearlevel == '') {
                y=y+"*Year level is Required!<br>"
              }
              if (this.term == '') {
                y=y+"*Term is Required!<br>"
              }
              if (this.subjectId == '') {
                y=y+"*Subject ID is Required!<br>"
              }
              if (this.subjectTitle == '') {
                y=y+"*Subject title is Required!<br>"
              }
              if ((this.lecUnits == '' || parseInt(this.lecUnits) == parseInt('asdasd')) && parseInt(this.lecUnits) != 0 ) {
                y=y+"*Lecture Units is Required!<br>"
              }
              if ((this.labUnits == '' || parseInt(this.labUnits) == parseInt('asdasd')) && parseInt(this.labUnits) != 0 )  {
                y=y+"*Laboratory Units is Required!<br>"
              }
              if (this.department == '') {
                y=y+"*Department is Required!<br>"
              }
              if ((this.hours == '' || parseInt(this.hours) == parseInt('asdasd')) && parseInt(this.hours) != 0 ) {
                y=y+"*Hours is Required!<br>"
              }
              if (y!='') {
                this.global.swalAlert("Field Required Alert!",y,"warning")
              }else
          this.http.get(this.global.api+'Curriculum/Subjects/'+this.subjectId,this.global.option)         .map(response => response.json())
          .subscribe(res => {
            if (res.data==null||res.data.length==0) {
            this.global.swalLoading('')  
                this.http.post(this.global.api+'Curriculum/Subject',{
                   "programId": this.progid,
                    "yearLevel": this.yearlevel,
                    "term": this.term,
                    "subjectId": this.subjectId,
                    "subjectTitle": this.subjectTitle,
                    "lecUnits": this.lecUnits,
                    "labUnits": this.labUnits,
                    "tfr": this.tfr,
                    "lfr": this.lfr,
                    "labType": this.labType,
                    "departmentId": this.department,
                    "subjectTypeId": this.subtype,
                    "hours": this.hours
               },this.global.option)
                      .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message)
                this.dialogRef.close({result:'saved',data:this.progid});
              },Error=>{
                console.log(Error)
                this.global.swalAlertError()
              });
            }else{
              this.global.swalAlert("Subject ID already exist!",res.data.programId+" - "+res.data.programTitle,"warning")
            }
          },Error=>{
            console.log(Error)
          });
  }
  }

  subput(){
    {
          var y = ''
              // if (this.yearlevel == '') {
              //   y=y+"*Year level is Required!<br>"
              // }
              var tfr=0
              var lfr=0
              if (this.tfr!='') {
                tfr= parseInt(this.tfr)
              }else
              {
                tfr = 0
              }

              if (this.lfr!='') 
                lfr= parseInt(this.lfr)
              else
                lfr= 0
              if (y!='') {
                this.global.swalAlert("Field Required Alert!",y,"warning")
              }else 
                this.http.put(this.global.api+'Curriculum/Subject/'+this.recordid,{
                   "programId": this.progid,
                    "yearLevel": this.yearlevel,
                    "term": this.term,
                    "subjectId": this.subjectId,
                    "subjectTitle": this.subjectTitle,
                    "lecUnits": this.lecUnits,
                    "labUnits": this.labUnits,
                    "tfr": tfr,
                    "lfr": lfr,
                    "labType": this.labType,
                    "departmentId": this.department,
                    "subjectTypeId": this.subtype,
                    "hours": this.hours
               },this.global.option)
                      .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message)
                this.dialogRef.close({result:'updated',data:this.progid});
              },Error=>{
                console.log(Error)
                this.global.swalAlertError()
              });
          }
         }



}
