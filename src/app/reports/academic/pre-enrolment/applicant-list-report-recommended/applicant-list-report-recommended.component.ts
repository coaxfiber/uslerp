import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';

import * as XLSX from 'xlsx'; 
@Component({
  selector: 'app-applicant-list-report-recommended',
  templateUrl: './applicant-list-report-recommended.component.html',
  styleUrls: ['./applicant-list-report-recommended.component.css']
})
export class ApplicantListReportRecommendedComponent implements OnInit {
  array
  sy
  constructor(public global: GlobalService,private http: Http,) { }

  ngOnInit() {
  	this.sy=this.global.checknosemester(this.global.syear)
  	this.loaddata()
  }

  reportCardStatusVar=''
  reportCardStatus=[]
  arraycomp=[]

  idNumber=''
  name=''
  preferredCourseDeptCodeVar='all'
  preferredCourseDeptCode=[]
  preferredCourseVar='all'
  preferredCourse=[]
  approvedRecommendedCourseDeptCodeVar='all'
  approvedRecommendedCourseDeptCode=[]
  approvedRecommendedCourseVar='all'
  approvedRecommendedCourse=[]

  edate=''
  sdate=''
  loaddata(){
	this.array=undefined;
  	this.http.get(this.global.api+"ReportSummary/ApplicantSummaryList/Recommended/"+this.sy,this.global.option)
		  .map(response => response.json())
		  .subscribe(res => {
		    this.array=[];
        console.log(res)
        for (var i = 0; i < res.data.length; ++i) {
          if (!this.preferredCourseDeptCode.includes(res.data[i].preferredCourseDeptCode)) {
            this.preferredCourseDeptCode.push(res.data[i].preferredCourseDeptCode)
          }
          if (!this.preferredCourse.includes(res.data[i].preferredCourse)) {
            this.preferredCourse.push(res.data[i].preferredCourse)
          }
          if (!this.approvedRecommendedCourseDeptCode.includes(res.data[i].approvedRecommendedCourseDeptCode)) {
            this.approvedRecommendedCourseDeptCode.push(res.data[i].approvedRecommendedCourseDeptCode)
          }
          if (!this.approvedRecommendedCourse.includes(res.data[i].approvedRecommendedCourse)) {
            this.approvedRecommendedCourse.push(res.data[i].approvedRecommendedCourse)
          }
          if(res.data[i].approvedRecommendedCourse==null)
            res.data[i].approvedRecommendedCourse=''
          if(res.data[i].approvedRecommendedCourseDeptCode==null)
            res.data[i].approvedRecommendedCourseDeptCode=''
        }

        this.array=res.data;
        this.arraycomp=res.data;
		  },Error=>{
		    this.array=[];
		    this.global.swalAlertError(Error);
		  });
  }

  Filter(){
    this.array=[];
    for (var i = 0; i < this.arraycomp.length; ++i) {
      if (
        (this.reportCardStatusVar==''||this.arraycomp[i].uploadedReportCard==this.reportCardStatusVar)&&
        (this.approvedRecommendedCourseVar=='all'||this.arraycomp[i].approvedRecommendedCourse==this.approvedRecommendedCourseVar)&&
        (this.preferredCourseDeptCodeVar=='all'||this.arraycomp[i].preferredCourseDeptCode==this.preferredCourseDeptCodeVar)&&
        (this.approvedRecommendedCourseDeptCodeVar=='all'||this.arraycomp[i].approvedRecommendedCourseDeptCode==this.approvedRecommendedCourseDeptCodeVar)&&
        (this.preferredCourseVar=='all'||this.arraycomp[i].preferredCourse==this.preferredCourseVar)&&
        (this.idNumber==''||this.arraycomp[i].idNumber.includes(this.idNumber))&&
        (this.name.toLowerCase()==''||this.arraycomp[i].name.toLowerCase().includes(this.name.toLowerCase()))
        ) {
         this.array.push(this.arraycomp[i])
      }
    }
  }
    export(){
  	  var arr=[]
      for (var i = 0; i < this.array.length; ++i) {
      	arr.push(
      		 {
      		 	"ID Number": this.array[i].idNumber,
      		 	"Name": this.array[i].name,
      		 	"Approved Course": this.array[i].approvedRecommendedCourse,
      		 	"Approved Course Dept Code": this.array[i].approvedRecommendedCourseDeptCode,
      		 	"Preferred Course": this.array[i].preferredCourse,
      		 	"Preferred Course Dept Code": this.array[i].preferredCourseDeptCode,
      		 	"Uploaded Report Card": this.array[i].uploadedReportCard,
            "SMS Counter": this.array[i].reportCard_FollowUp_SMS_Ctr,
            "Date last sent": this.array[i].reportCard_FollowUp_SMS_LastDate_Sent=="0001-01-01T00:00:00" ? '' : (new Date(this.array[i].reportCard_FollowUp_SMS_LastDate_Sent).toDateString()).slice(4) ,
      		 	"Result": this.array[i].result,
      		 }
      		)
      }
    this.global.swalClose();


    var wscols = [
        {wch:15},
        {wch:30},
        {wch:20},
        {wch:20},
        {wch:20},
        {wch:20},
        {wch:15},
        {wch:10},
        {wch:20},
        {wch:10},
    ];

      var fileName= 'ApplicantSummaryListRecommended-'+this.global.syDisplay(this.sy)+'.xlsx'
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(arr);
        ws['!cols'] = wscols;
       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'SummaryListRecommended');


       /* save to file */
       XLSX.writeFile(wb, fileName);
   // this.excelService.exportAsExcelFile(arr, 'ApplicantSummaryListRecommended-'+this.global.syDisplay(this.sy));
         
  }
}
