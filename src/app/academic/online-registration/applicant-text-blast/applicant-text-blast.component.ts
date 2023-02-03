import { Inject} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoadingApplicantTextBlastComponent } from './loading-applicant-text-blast/loading-applicant-text-blast.component';

import Swal from 'sweetalert2';
const swal = Swal;
@Component({
  selector: 'app-applicant-text-blast',
  templateUrl: './applicant-text-blast.component.html',
  styleUrls: ['./applicant-text-blast.component.css']
})
export class ApplicantTextBlastComponent implements OnInit {
  loading=true
  array = []
  arraybased=[]
  filt = ''
  search=''
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<ApplicantTextBlastComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) {

  }

  ngOnInit() {
  	this.loadData()
  }

  loadData(){
  this.loading=true
	this.http.get(this.global.api+'OnlineRegistration/Applicant/NoUplodedProofOfPayment/'+this.global.checknosemester(this.global.syear),this.global.option)
     .map(response => response.json())
     .subscribe(res => {
       console.log(res)
        this.array=res.data
        if (res.data==null) {
          this.array=[]
          this.global.swalAlert("Warning!",res.message,'warning')
        }
        this.arraybased=res.data
		    this.loading=false
        this.filter()
     },Error=>{
        this.global.swalAlertError(Error)
		    this.loading=false
     });
  }

  close(): void {
       this.dialogRef.close({result:'cancel'});
  }

  filter(){
    this.array=[]
    for (var i = 0; i < this.arraybased.length; ++i) {
      if ((this.filt==''||(this.filt=='1'&&this.arraybased[i].smS_Ctr_Success>0)||(this.filt=='0'&&this.arraybased[i].smS_Ctr_Success==0) ) &&
        (
        this.search==''||
        this.arraybased[i].applicantNo.toString().includes(this.search.toUpperCase())||
        this.arraybased[i].lastName.toUpperCase().includes(this.search.toUpperCase())||
        this.arraybased[i].firstName.toUpperCase().includes(this.search.toUpperCase())||
        this.arraybased[i].middleName.toUpperCase().includes(this.search.toUpperCase())
        )
        ){
       
        this.array.push(this.arraybased[i])
      }
    }
  }

  openHistory(data){
    const dialogRef = this.dialog.open(LoadingApplicantTextBlastComponent, {
        width: '500px', disableClose: false , data:{applicantNo:data, type: 1} ,
      });

      dialogRef.afterClosed().subscribe(result => {
        //console.log(result)
        if (result!=undefined) {
          if (result.result=='save') {
            this.loadData()
          }
        }
      });
  }

  swalConfirm()
  {
    swal.fire({
        title: 'Text Blast Confirmation!',
        text: 'Are you sure you want to send '+this.array.length+" text message?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
           const dialogRef = this.dialog.open(LoadingApplicantTextBlastComponent, {
              width: '300px', disableClose: true , data:{data:this.array, type: 0} ,
            });

            dialogRef.afterClosed().subscribe(result => {
              //console.log(result)
              if (result!=undefined) {
                if (result.result=='save') {
                  this.loadData()
                }
              }
            });
        }
      })
  }
}
