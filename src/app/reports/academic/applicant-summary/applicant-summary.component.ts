import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {ExcelService} from './../../../academic/curriculum/excel.service';

@Component({
  selector: 'app-applicant-summary',
  templateUrl: './applicant-summary.component.html',
  styleUrls: ['./applicant-summary.component.scss']
})
export class ApplicantSummaryComponent implements OnInit {

  constructor(private excelService:ExcelService,public global: GlobalService,private http: Http,) { }
 sdate=''
  edate=''
  csdate
  cedate
	array=null
  course=''
  result=''
  exportarray=[]
  array2=[]
  ngOnInit() {
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


	this.http.get(this.global.api+"ReportSummary/ApplicantSummaryCount/ProgLevel/?dateFrom="+this.csdate+"&dateTo="+this.cedate,this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
      this.array=res.data;
      this.exportarray=[]
      for (var i = 0; i < res.data.length; ++i) {
        this.exportarray.push({
          dept:"",
          pcourse:"",
          perdeptcount:"",
          blank:" ",
          proglevel:res.data[i].progLevelDesc,
          perprogcount:res.data[i].applicant_Count,
        })
      }
        this.http.get(this.global.api+"ReportSummary/ApplicantSummaryCount/PreferredCourse/00/90?dateFrom="+this.csdate+"&dateTo="+this.cedate,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.array2=res.data;
           for (var i = 0; i < res.data.length; ++i) {
             if (i<=6) {
               if (this.exportarray[i]!=undefined) {
                this.exportarray[i].dept=res.data[i].department
                this.exportarray[i].pcourse=res.data[i].preferredCourse
                this.exportarray[i].perdeptcount=res.data[i].applicant_Count
               }
             }else{
                this.exportarray.push({
                  dept:res.data[i].department,
                  pcourse:res.data[i].preferredCourse,
                  perdeptcount:res.data[i].applicant_Count,
                  blank:" ",
                  proglevel:'',
                  perprogcount:'',
                })
             }
            }
        },Error=>{
          this.array2=[];
          this.global.swalAlertError()
        });
	  },Error=>{
	    this.array=[];
	    this.global.swalAlertError()
	  });
  	}else{
  		this.global.swalAlert(x,'',"warning")
  	}


  }

  export(){
    console.log(this.exportarray)
  	  var arr=[]
      for (var i = 0; i < this.exportarray.length; ++i) {

      	arr.push(
      		 {
      		 	"Department": this.exportarray[i].dept,
      		 	"Preffered course": this.exportarray[i].pcourse,
      		 	"Applicant count": this.exportarray[i].perdeptcount,
      		 	" ": this.exportarray[i].blank,
      		 	"Program Level": this.exportarray[i].proglevel,
      		 	"Applicant count ": this.exportarray[i].perprogcount,
      		 }
      		)
      }

    this.global.swalClose();
    this.excelService.exportAsExcelFile(arr, 'Applicant summary('+this.csdate+'-'+this.cedate+')-');
         
  }
}
