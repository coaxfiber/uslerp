import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {ExcelService} from './../../../../../academic/curriculum/excel.service';

@Component({
  selector: 'app-college-preenrolmentstat-course',
  templateUrl: './college-preenrolmentstat-course.component.html',
  styleUrls: ['./college-preenrolmentstat-course.component.css']
})
export class CollegePreenrolmentstatCourseComponent implements OnInit {
  option=''
  array=[]
  constructor(private excelService:ExcelService,public global: GlobalService,private http: Http,) { }

  ngOnInit() {
  }
  
  loaddata(){
  	this.array=undefined
  	this.http.get(this.global.api+'ReportSummary/PreEnrollmentStatistics/Course/'+this.global.syear+'/'+this.option,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
              	this.array=res.data
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
  }

  exportAsXLSX():void {
    var x=[]
    for (var i = 0; i < this.array.length; ++i) {
      x.push({
        'Course Code':this.array[i].courseCode,
        'Previous Not Verified':this.array[i].previousPreEnrolled_NotVerifiedOnly,
        'Previous Verified':this.array[i].previousPreEnrolled_VerifiedOnly,
        'Previous All':this.array[i].previousPreEnrolled_All,
        'Current Not Verified':this.array[i].currentPreEnrolled_NotVerifiedOnly,
        'Current Verified':this.array[i].currentPreEnrolled_VerifiedOnly,
        'Current All':this.array[i].currentPreEnrolled_All,
      })
    }
   this.excelService.exportAsExcelFile(x, 'College_Pre-enrollment_Summary_ByCourse_'+this.global.syear);
  }
}
