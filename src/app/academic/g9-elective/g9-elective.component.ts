import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';

import {Sort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import Swal from 'sweetalert2';
const swal = Swal;

import {ExcelService} from './../../academic/curriculum/excel.service';
import * as XLSX from 'xlsx'; 

import { G9ElectiveUpdateComponent } from './g9-elective-update/g9-elective-update.component';
@Component({
  selector: 'app-g9-elective',
  templateUrl: './g9-elective.component.html',
  styleUrls: ['./g9-elective.component.scss']
})
export class G9ElectiveComponent implements OnInit {
hide=true
  constructor(public global: GlobalService,private http: Http,public dialog: MatDialog) { }
tableArr=[]
temp=[]
elective=""
electivearray=[]
  ngOnInit() {
  	this.loaddata()
  }
  id=''

  electivelist=[]
  loaddata(){
  	// this.http.delete(this.global.api+'StudentPortal/HSEnrollment/Student/Elective/1402157/5/'+this.global.syear,this.global.option)
   //            .map(response => response.json())
   //            .subscribe(res => {});
    this.tableArr=undefined
    var sy = this.global.syear
        sy = this.global.syear.slice(0, -1)
     this.http.get(this.global.api+'Enrollment/HSEnrollment/Student/Elective/'+sy,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                    this.tableArr = res.data
                    this.temp = res.data
                    this.keyDownFunction()
                this.http.get(this.global.api+'Enrollment/HSEnrollment/Electives/'+sy,this.global.option)
		              .map(response => response.json())
		              .subscribe(res => {
                  this.electivelist=res.data 
		              },Error => {
		                this.global.swalAlertError();
		              });
              },Error => {
                this.global.swalAlertError();
              });

  }

  keyDownFunction(){
    this.tableArr=[]
    for (var i = 0; i < this.temp.length; ++i) {
      if ((this.temp[i].idNumber.toLowerCase().includes(this.id.toLowerCase())||this.temp[i].fullName.toLowerCase().includes(this.id.toLowerCase()))&&this.temp[i].electiveId.toString().includes(this.elective)) {
       this.tableArr.push(this.temp[i])
      }
    }
  }

   fileName=''
  exportexcel(): void 
    {
      this.hide=false
      setTimeout(()=>{  
       this.fileName= 'G9Elective.xlsx'
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);

      this.hide=true
     });
       
      
    }

    swalConfirm(title,text,eid,id)
  {
    swal.fire({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Confirm"
      }).then((result) => {
        if (result.value) {
    var sy = this.global.syear
        sy = this.global.syear.slice(0, -1)
            this.http.delete(this.global.api+'Enrollment/HSEnrollment/Student/Elective/'+id+'/'+eid+'/'+sy,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message)
                this.loaddata()
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
        }
      })
  }

  openDialog(eid,id,fullname): void {
    const dialogRef = this.dialog.open(G9ElectiveUpdateComponent, {
          width: '400px', disableClose: false , data:{eid:eid,id:id,fullname:fullname,array:this.electivelist,type:0}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='save') {
                this.loaddata()
            }
          }
        });
    }
}
