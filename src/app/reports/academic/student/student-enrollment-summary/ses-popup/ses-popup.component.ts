import { Component, OnInit } from '@angular/core';


import {ExcelService} from './../../../../../academic/curriculum/excel.service';
import * as XLSX from 'xlsx'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GlobalService } from './../../../../../global.service';
import { Inject} from '@angular/core';
@Component({
  selector: 'app-ses-popup',
  templateUrl: './ses-popup.component.html',
  styleUrls: ['./ses-popup.component.scss']
})
export class SesPopupComponent implements OnInit {
	array=[]
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<SesPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private excelService:ExcelService,public global: GlobalService,) { }

  ngOnInit() {
  	this.array = this.data.list
  }

	close(){
	   this.dialogRef.close({result:'cancel'});
	}
  jhscount(){
    var x=0
    for (var i = 0; i < this.data.list.length; ++i) {
     if (this.data.list[i].yearOrGradeLevel<5) {
       x++
     }
    }
    return x
  }
  shscount(){
    var x=0
    for (var i = 0; i < this.data.list.length; ++i) {
     if (this.data.list[i].yearOrGradeLevel>=5) {
       x++
     }
    }
    return x
  }
   export(){ 
     var arr=[]
      for (var i = 0; i < this.array.length; ++i) {
        arr.push(
           {
             "ID Number": this.array[i].idNumber,
             "Full Name": this.array[i].fullName,
             "Year or Grade": this.array[i].yearOrGradeLevel,
             "Gender": this.array[i].gender,
             "Course": this.array[i].course,
             "Status": this.array[i].status,
           }
          )
      }
      var txt = "Admitted"
      if (this.data.x!=0) {
        txt = "Officially Enrolled"
      }
    this.excelService.exportAsExcelFile(arr, 'List of '+txt+' Students: '+this.data.proglevel+" - "+this.global.syDisplay(this.data.sy));
         
  }







}
