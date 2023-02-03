import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {ExcelService} from './../../../../academic/curriculum/excel.service';

@Component({
  selector: 'app-placement-summary',
  templateUrl: './placement-summary.component.html',
  styleUrls: ['./placement-summary.component.scss']
})
export class PlacementSummaryComponent implements OnInit {
  sdate=''
  edate=''
  csdate
  cedate
	array=null
  course=''
  result=''
  coursearray=[]
  constructor(private excelService:ExcelService,public global: GlobalService,private http: Http,) { }

  ngOnInit() {
    this.http.get(this.global.api+'OnlineRegistration/CoursesWithStrand/',this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                    this.coursearray=[]
                    if (this.global.domain=="COLLEGE") {
                      for (var i1 = 0; i1 < res.data.length; ++i1) {
                        if (res.data[i1].programLevel=='50') {
                        this.coursearray.push(res.data[i1])
                        }
                      }
                    }else if (this.global.domain=="GRADUATE SCHOOL"){
                      for (var i1 = 0; i1 < res.data.length; ++i1) {
                        if (res.data[i1].programLevel=='80'||res.data[i1].programLevel=='90') {
                        this.coursearray.push(res.data[i1])
                        }
                      }
                    }
                  });
  }

  checktogenerate(){
  	var x=''
  	if (this.sdate=='') {
  	 x=x+"*Start date is required.<br>"
  	}

  	if (this.edate=='') {
  	 x=x+"*End date is required.<br>"
  	}

  	if (x=='') {
    let date = new Date(this.sdate).toLocaleString();
	var str = date;
	var res = str.split(",");
	this.csdate=res[0].replace(/\//g,'-')
    date = new Date(this.edate).toLocaleString();
	str = date;
	res = str.split(",");
	this.cedate=res[0].replace(/\//g,'-')
	this.array=undefined;
  if (this.course=='') {
    this.result=''
  }
	this.http.get(this.global.api+"ReportSummary/PlacementSummary/"+this.csdate+"/"+this.cedate+"?firstChoiceCourseCode="+this.course+"&firstChoiceResult="+this.result,this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	      this.array=res.data;
	  },Error=>{
	    this.array=[];
	    this.global.swalAlertError()
	  });
  	}else{
  		this.global.swalAlert(x,'',"warning")
  	}


  }

  export(){
  	  var arr=[]
  	  var date
      for (var i = 0; i < this.array.length; ++i) {

  	  let date
  	  date =new Date(this.array[i].examDate).toLocaleString().split(','); 
      	arr.push(
      		 {
      		 	"ID Number": this.array[i].idNumber,
      		 	"Name": this.array[i].name,
      		 	"Strand Code": this.array[i].strandCode,
      		 	"Strand Title": this.array[i].strandTitle,
      		 	"Exam Date": date[0],
      		 	"Score": this.array[i].score,
      		 	"First Choice": this.array[i].firstChoice,
      		 	"First Choic Result": this.array[i].firstChoiceResult,
      		 	"Second Choice": this.array[i].secondChoice,
      		 	"Second Choice Result": this.array[i].secondChoiceResult,
      		 	"Third Choice": this.array[i].thirdChoice,
      		 	"Third Choice Result": this.array[i].thirdChoiceResult
      		 }
      		)
      }

    this.global.swalClose();
    this.excelService.exportAsExcelFile(arr, 'PlacementExamResult('+this.csdate+'-'+this.cedate+')-');
         
  }
}
