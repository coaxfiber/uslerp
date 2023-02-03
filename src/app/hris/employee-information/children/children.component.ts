import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';

import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChildrenComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChildrenComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private global: GlobalService,private http: Http) { }
  fname
  mname
  lname
  bdate
  usltid
  SID
  ngOnInit() {

  }
  
  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }
  
  save(): void {
    //console.log(this.data.selectedID);
 	  this.global.swalLoading('Adding Child Info');
    this.http.post(this.global.api+'Employee/Child/'+this.data.selectedID,{
              "firstname": this.fname,
              "middlename": this.mname,
              "lastname": this.lname,
              "dateofbirth": this.bdate,
              "usltid": this.usltid,
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
