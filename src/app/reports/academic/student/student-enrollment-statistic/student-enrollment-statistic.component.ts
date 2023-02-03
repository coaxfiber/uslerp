import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-student-enrollment-statistic',
  templateUrl: './student-enrollment-statistic.component.html',
  styleUrls: ['./student-enrollment-statistic.component.scss']
})
export class StudentEnrollmentStatisticComponent implements OnInit {
proglevel='ALL'
array=null
  sy


  constructor(public global: GlobalService,private http: Http,) { }

  ngOnInit() {
    this.sy=this.global.syear
  }

  generate(){
  		this.array=undefined
      if (this.proglevel=='HIGHSCHOOL'||this.proglevel=='ELEMENTARY') {
        this.sy = this.global.syear.substring(0,6)
      }else
        this.sy = this.global.syear
		this.http.get(this.global.api+"ReportSummary/EnrollmentStatistics/"+this.sy+"?level="+this.proglevel,this.global.option)
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

  getotal(x){
    var total1=0
    var total2=0
    var total3=0
    for (var i = 0; i < this.array.length; ++i) {
      total1 = this.array[i].currentAdmitted+total1
      total2 = this.array[i].oldPaid+total2
      total3 = this.array[i].currentPaid+total3
    }
    if (x==1) {
      return total1
    }
    if (x==2) {
      return total2
    }else{
      return total3

    }
  }
exportexcel(): void 
    {
      var fileName= 'EnrollmentStatistics('+this.proglevel+')-'+this.global.syear+'.xlsx'
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, fileName);	
    }
}
