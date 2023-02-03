import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import Swal from 'sweetalert2';
const swal = Swal;
import { AddUpdateRetentionPolicyComponent } from './add-update-retention-policy/add-update-retention-policy.component';


@Component({
  selector: 'app-retention-policy',
  templateUrl: './retention-policy.component.html',
  styleUrls: ['./retention-policy.component.scss']
})
export class RetentionPolicyComponent implements OnInit {
  progid=''
  rp=[]
  year2
  year1

  averageNotLowerThan
  gradeNotLowerThan
  yearlevel=''
  semester=''
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<RetentionPolicyComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }


openDialoglookup(x,a): void {
    const dialogRef = this.dialog.open(AddUpdateRetentionPolicyComponent, {
          width: '610px', disableClose: false, data:{data:x,array:a,pid:this.data.data.programId}
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
  ngOnInit() {
    this.loadpresub()
  }

  loadpresub(){
    this.rp=undefined;
     this.http.get(this.global.api+'Curriculum/RetentionPolicy/'+this.data.data.programId,this.global.option)         .map(response => response.json())
          .subscribe(res => {
            this.rp=[];
            this.rp=res.data;
            console.log(res.data)
          },Error=>{
            console.log(Error)
          });
  }
	close(){
       this.dialogRef.close({result:'cancel'});
		
	}

  displayyear(x){

    x.substring(0,4)
    var y = parseInt(x.substring(0,4))
    x = y.toString() +" - " +(y+1).toString();
    if (x=='NaN - NaN') {
      x = ''
    }
    return x
   }

   displaysem(y){
     var x = y.toString()
     if (x=='1') {
      x='1st'
     }
     if (x=='2') {
      x='2nd'
     }
     if (x=='3') {
      x='Summer'
     }
     return x
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

  removeyl(rid){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove Policy Retention','Policy Retention has been Removed','','sy',rid);
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
            this.http.delete(this.global.api+'Curriculum/RetentionPolicy/'+rid,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
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
