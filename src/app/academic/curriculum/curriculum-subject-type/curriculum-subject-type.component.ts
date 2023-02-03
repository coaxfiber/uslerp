import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import Swal from 'sweetalert2';
const swal = Swal;
import { CurriculumSubjectTypeAddComponent } from './curriculum-subject-type-add/curriculum-subject-type-add.component';


@Component({
  selector: 'app-curriculum-subject-type',
  templateUrl: './curriculum-subject-type.component.html',
  styleUrls: ['./curriculum-subject-type.component.scss']
})
export class CurriculumSubjectTypeComponent implements OnInit {
	rp
    constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<CurriculumSubjectTypeComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

  ngOnInit() {
  	this.loadpresub()
  }

  loadpresub(){
    this.rp=undefined;
     this.http.get(this.global.api+'Curriculum/CurriculumRetentionPolicySubjectType/'+this.data.data.programId,this.global.option)         .map(response => response.json())
          .subscribe(res => {
            this.rp=[];
            this.rp=res.data;
            console.log(res.data)
          },Error=>{
            console.log(Error)
          });
  }

openDialog(x,a): void {
    const dialogRef = this.dialog.open(CurriculumSubjectTypeAddComponent, {
          width: '650px', disableClose: false, data:{data:x,array:a,pid:this.data.data.programId}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result!='cancel') {
              this.loadpresub()
            }
          }
        });
    }

    removeyl(rid){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove Policy Retention Subject Type','Policy Retention Subject Type has been Removed','','sy',rid);
  }
  
	close(){
       this.dialogRef.close({result:'cancel'});
		
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
          if (remove=='sy') { 
            this.global.swalLoading('')
            this.http.delete(this.global.api+'Curriculum/CurriculumRetentionPolicySubjectType/'+rid,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
              	console.log(res)
              	console.log(rid)
                //this.global.swalSuccess(res.message)
                this.global.swalClose();
                this.loadpresub()
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
