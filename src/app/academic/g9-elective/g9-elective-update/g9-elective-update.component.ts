import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
@Component({
  selector: 'app-g9-elective-update',
  templateUrl: './g9-elective-update.component.html',
  styleUrls: ['./g9-elective-update.component.css']
})
export class G9ElectiveUpdateComponent implements OnInit {
selected=''

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<G9ElectiveUpdateComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

  ngOnInit() {
  	this.selected = this.data.eid.toString()
  }
  close(): void {
       this.dialogRef.close({result:'cancel'});
  }

  checktemp=false
  check2(){
    if (!this.checktemp) {
     this.global.swalLoading('')
      this.checktemp=true
      var sy = this.global.syear
        sy = this.global.syear.slice(0, -1)
      this.http.post(this.global.api+'Enrollment/HSEnrollment/Student/Elective/' ,{
          "IdNumber": this.data.id,
          "ElectiveId": this.selected,
          "SchoolYear": sy
        },this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.checktemp=false
                if (res.message=="1") {
                  this.global.swalSuccess('Student Elective Updated')
                }else
                 this.global.swalAlert("Elective is full!",'','warning')
                  
                this.dialogRef.close({result:'save'});
              },Error=>{
                this.global.swalAlertError();
                console.log(Error);
                this.checktemp=false
              });
    }
  }


  check(){
    if (!this.checktemp) {
     this.global.swalLoading('')
      this.checktemp=true
      var sy = this.global.syear
      if (this.global.domain!='COLLEGE'&&this.global.domain!='GRADUATE SCHOOL') {
        if (this.global.syear.length==7) {
          sy = this.global.syear.slice(0, -1)
        }
      }
      this.http.post(this.global.api+'Enrollment/LearningModality' ,{
          "IdNumber": this.data.id,
          "LearningModalityId": this.selected,
          "SchoolYear": sy
        },this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.checktemp=false
                this.global.swalSuccess(res.message)
             this.dialogRef.close({result:'save'});
              },Error=>{
                this.global.swalAlertError();
                console.log(Error);
                this.checktemp=false
              });
    }
  }
}
