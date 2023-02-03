import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-enrolment-summary',
  templateUrl: './enrolment-summary.component.html',
  styleUrls: ['./enrolment-summary.component.scss']
})
export class EnrolmentSummaryComponent implements OnInit {
	proglevel=''
	array=null
  sy


  constructor(public global: GlobalService,private http: Http,) { }

  ngOnInit() {
    this.sy=this.global.syear
  }

  generate(){
  	if (this.proglevel=='') {
  		this.global.swalAlert("Program level is required!",'','warning')
  	}else{
  		this.array=undefined
		this.http.get(this.global.api+"ReportCHED/EnrollmentSummaryCHED/"+this.sy+"?level="+this.proglevel,this.global.option)
		  .map(response => response.json())
		  .subscribe(res => {
		      this.array=[];
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

  fileName= '.xlsx';  

exportexcel(): void 
    {
       this.fileName= 'CHEDEnrollmentList-'+this.proglevel+'.xlsx'
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'CHEDEnrollmentList');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

  getmf(x){
  	var m1=0,m2=0,m3=0,m4=0,m5=0,f1=0,f2=0,f3=0,f4=0,f5=0
  	for (var i = 0; i < this.array.length; ++i) {
  		m1=m1+this.array[i].m1
  		m2=m2+this.array[i].m2
  		m3=m3+this.array[i].m3
  		m4=m4+this.array[i].m4
  		m5=m5+this.array[i].m5
  		f1=f1+this.array[i].f1
  		f2=f2+this.array[i].f2
  		f3=f3+this.array[i].f3
  		f4=f4+this.array[i].f4
  		f5=f5+this.array[i].f5
  	}
  	if (x=='m1') 
  		return m1
  	if (x=='m2') 
  		return m2
  	if (x=='m3') 
  		return m3
  	if (x=='m4') 
  		return m4
  	if (x=='m5') 
  		return m5
  	if (x=='f1') 
  		return f1
  	if (x=='f2') 
  		return f2
  	if (x=='f3') 
  		return f3
  	if (x=='f4') 
  		return f4
  	if (x=='f5') 
  		return f5
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
