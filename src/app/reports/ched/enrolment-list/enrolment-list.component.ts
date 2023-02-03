import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {ExcelService} from './../../../academic/curriculum/excel.service';

@Component({
  selector: 'app-enrolment-list',
  templateUrl: './enrolment-list.component.html',
  styleUrls: ['./enrolment-list.component.scss']
})
export class EnrolmentListComponent implements OnInit {
 	proglevel=''
	array=null
	sy
  pageSize=15
  pageNumber=1


  constructor(private excelService:ExcelService,public global: GlobalService,private http: Http,) { }

  ngOnInit() {
  	this.sy=this.global.syear
  }

  generate(exportToExcel){
  	if (this.proglevel=='') {
  		this.global.swalAlert("Program level is required!",'','warning')
  	}else{
  		this.array=undefined
		this.http.get(this.global.api+"ReportCHED/EnrollmentListCHED/"+this.sy+"?level="+this.proglevel+"?pageSize="+this.pageSize+"?pageNumber="+this.pageNumber+"?exportToExcel="+0,this.global.option)
		  .map(response => response.json())
		  .subscribe(res => {
		      this.array=[];
		      console.log(res)
		  	if (res.data==null) {
		  		this.global.swalAlert(res.message,'','warning')
		  	}else
		      this.array=res.data;
		  },Error=>{
		    this.array=[];
		    this.global.swalAlertError()
		  });
  	}
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
      		 	"Course": this.array[i].courseCode+' - '+this.array[i].programTitle,
      		 	"Subjects": this.array[i].subjects,
      		 	"Total Units": this.array[i].totalUnits,
      		 }
      		)
      }
      
    this.global.swalClose();
    this.excelService.exportAsExcelFile(arr, 'CHEDEnrollmentList-'+this.proglevel);
         
  }
  display(x){
    var y = x.substring(0,4)
    var z = parseInt(y) + 1
    var a = y.toString() + " - " + z.toString();
    var b = x.substring(6,7)
    var c
    if (b==1)
      c="First Semester"
    else if (b==2)
      c="Second Semester"
    else
      c="Summer"
    return "School Year "+a + " " + c
  }
}
