import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import Swal from 'sweetalert2';
const swal = Swal;
@Component({
  selector: 'app-other-pre-requisites',
  templateUrl: './other-pre-requisites.component.html',
  styleUrls: ['./other-pre-requisites.component.scss']
})
export class OtherPreRequisitesComponent implements OnInit {
stat=0

yearLevel=''
arrayyearLevel
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<OtherPreRequisitesComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

  loadyl(){
    this.arrayyearLevel=undefined;
     this.http.get(this.global.api+'Curriculum/Subject/OtherRequisite/'+this.data.data.recordId,this.global.option)         .map(response => response.json())
          .subscribe(res => {
            if (res.data==null) {
             this.stat=0;
            }else
             this.stat=1;

             this.arrayyearLevel=res.data;
          },Error=>{
            console.log(Error)
          });
  }
  ngOnInit() {
         
    this.loadyl()
          
  }
  change(x,a){
    this.stat=x
    if (x==2) {
      this.yearLevel = a
    }
  }
  selectsub(x){
    this.yearLevel=x.toString()
   
  }

  prereqPost(){
    if (this.yearLevel!='') {
this.global.swalLoading('')
          this.http.post(this.global.api+'Curriculum/Subject/OtherRequisite',{
            "subjectRecordId": this.data.data.recordId,
            "yearLevelStanding": this.yearLevel
          },this.global.option)         .map(response => response.json())
          .subscribe(res => {
              if (res.message=='Subject other-requisite added successfully') {
                this.global.swalClose(); //this.global.swalSuccess(res.message)
              }else{
                this.global.swalAlert("Alert!",res.message,'warning')
              }
              this.yearLevel=''
              this.loadyl()
          },Error=>{
            console.log(Error)
          });
    }else{
      this.global.swalAlert("Alert!","No subject selected.","warning")
    }

  }

  otherreqput(){
    if (this.yearLevel!='') {this.global.swalLoading('')
          this.http.put(this.global.api+'Curriculum/Subject/OtherRequisite',{
            "subjectRecordId": this.data.data.recordId,
            "yearLevelStanding": this.yearLevel
          },this.global.option)         
          .map(response => response.json())
          .subscribe(res => {
              if (res.message=='Subject other-requisite updated successfully.') {
               
                this.global.swalClose();//this.global.swalSuccess(res.message)
              }else{
                this.global.swalAlert("Alert!",res.message,'warning')
              }
              this.yearLevel=''
              this.loadyl()
          },Error=>{
            console.log(Error)
          });
    }else{
      this.global.swalAlert("Alert!","No year level standing selected.","warning")
    }

  }

  removeyl(rid){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove Other requesite','Year level standing has been Removed','','sy',rid);
  }
  
  swalConfirm(title,text,type,button,d1,d2,remove,rid)
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
          if (remove=='sy') {this.global.swalLoading('')
            this.http.delete(this.global.api+'Curriculum/Subject/OtherRequisite/'+rid,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalClose();
                //this.global.swalSuccess(res.message)
                this.stat=0;
                this.loadyl()
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
  }
  close(){
       this.dialogRef.close({result:'cancel'});
  }

}
