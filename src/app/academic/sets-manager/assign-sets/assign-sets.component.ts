import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';

import Swal from 'sweetalert2';
const swal = Swal;
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
import { LookupCodeComponent } from './../../enrollment-manager/lookup-code/lookup-code.component';


@Component({
  selector: 'app-assign-sets',
  templateUrl: './assign-sets.component.html',
  styleUrls: ['./assign-sets.component.scss']
})
export class AssignSetsComponent implements OnInit {
	arraysubjects=[]	
  title
  dataSource; 
  tableArr:Array<any>;
  codeno=''
  displayedColumns = ['codeno','subjectId','subjectTitle','day','time','roomNumber','units', "classSize",'oe','res','action'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<AssignSetsComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

  ngOnInit() {
    if (this.data.indi==null) {
      this.displayedColumns = ['codeno','subjectId','subjectTitle','day','time','roomNumber','units', "classSize",'oe','res','action'];
    }else
      this.displayedColumns = ['codeno','subjectId','subjectTitle','day','time','roomNumber','units', "classSize",'oe','res'];
  	this.title=this.data.x.setDescription
	  this.getsubjects(0)
  }
  subj=[]
	getsubjects(x){
    this.arraysubjects=undefined
		this.http.get(this.global.api+'Code/SetDetails/'+this.data.x.headerId,this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                    this.arraysubjects=[]
                    this.arraysubjects=res.data

   this.subj = []
   for (var i = 0; i < res.data.length; ++i) {
       var subjectId = res.data[i].subjectId
       var units2 = res.data[i].units
       var codeNo = res.data[i].codeNo
       var subjectTitle = res.data[i].subjectTitle
             
     if (i>0) { 
       var x=i
       var check = 1
         if (codeNo==res.data[x-1].codeNo) {
            codeNo=''
            units2=0
            subjectId=''
            subjectTitle=''
          }
            if (i>1){
              if (codeNo==res.data[x-2].codeNo) {
                codeNo=''
                units2=0
                subjectId=''
                subjectTitle=''
              }
            }
            if (i>2){
              if (codeNo==res.data[x-3].codeNo) {
                codeNo=''
                units2=0
                subjectId=''
                subjectTitle=''
              }
            }
            if (i>4){
              if (codeNo==res.data[x-4].codeNo) {
                codeNo=''
                units2=0
                subjectId=''
                subjectTitle=''
              }
            }
            if (i>4){
              if (codeNo==res.data[x-5].codeNo) {
                codeNo=''
                units2=0
                subjectId=''
                subjectTitle=''
              }
            }
     }
     this.subj.push({
          classSize: res.data[i].classSize,
          codeNo: codeNo,
          day: res.data[i].day,
          detailId: res.data[i].detailId,
          headerId: res.data[i].headerId,
          roomNumber: res.data[i].roomNumber,
          subjectId: subjectId,
          subjectTitle: subjectTitle,
          time: res.data[i].time,
          units: units2,
          oe: res.data[i].oe,
          res: res.data[i].res,
        })
          
   }
                    this.dataSource = new MatTableDataSource(this.subj);
                    this.dataSource.sort = this.sort;
                    if (x!=0) {
                    }
                });
	}

checkvisible(x){
 if (x==''){return true}return false
}

deleteCode(codeno,id){
    this.swalConfirm("Confirm Delete","You are about to Delete the code "+codeno,'warning','Drop code','Code has been dropped','code',id);
}
  swalConfirm(title,text,type,button,successm,remove,id){
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
          if (remove=='code') {
             this.http.delete(this.global.api+'Code/SetDetail/'+ id,this.global.option)
                .map(response => response.text())
                .subscribe(res => {
                  this.getsubjects(0);
                },Error=>{
                  //console.log(Error);
                  console.log(Error)
                  this.global.swalAlertError()
                });
          }
        }
      })
  }

   close(): void {
       this.dialogRef.close({result:'cancel'});
  }

  settemp=true
	keyDownFunctionCODE(event){
    	if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {

        console.log(this.settemp)
        if (this.settemp) {
          this.settemp = false
    		if (this.codeno=='') {
            	this.global.swalAlert("Code does not exist","",'warning');
          	}else{
         let x = 1;
            for (var i = 0; i < this.arraysubjects.length; ++i) {
              if (this.arraysubjects[i].codeNo.toLowerCase()==this.codeno.toLowerCase()) {
                x=0;
              }
            }

              if (x==1) {
                this.http.get(this.global.api+'Enrollment/EnrolledSubjects/Code No/'+this.codeno+'/'+this.data.syear+'/true',this.global.option)
                            .map(response => response.json())
                            .subscribe(res => {
                              console.log(res.data)
                             if (res.data.length!=0) {
                                  this.http.post(this.global.api+'Code/SetDetail' ,{
                                    "headerId": this.data.x.headerId,
                                    "codeNo": this.codeno
                                  },this.global.option)
                                        .map(response => response.json())
                                        .subscribe(res => {
                                          this.codeno = ''
                                          this.settemp = true
                                         //this.global.swalSuccess(res.message) 
                                         this.getsubjects(1)
                                         //this.dialogRef.close({result:'save',val:this.sy});   
                                       },Error=>{
                                          //console.log(Error);
                                          this.global.swalAlertError();
                                          console.log(Error)
                                        });
                             }else
                              this.global.swalAlert("Code not found","Code "+this.codeno+" does not exist",'warning');
                                          this.settemp = true
                            },Error=>{
                      this.settemp = true
                              //console.log(Error);
                              console.log(Error)
                        this.tableArr=[];
                              this.global.swalClose()
                            });
              }else
                {  
                      this.settemp = true
                      this.global.swalAlert('Add Code',this.codeno+" already exist.",'warning');
                }
                      
          	}
    	}
	}
          // code...
        }
}
