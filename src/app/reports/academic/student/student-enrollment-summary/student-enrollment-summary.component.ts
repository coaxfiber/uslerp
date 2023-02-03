import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as XLSX from 'xlsx'; 
import { SesPopupComponent } from './ses-popup/ses-popup.component';

@Component({
  selector: 'app-student-enrollment-summary',
  templateUrl: './student-enrollment-summary.component.html',
  styleUrls: ['./student-enrollment-summary.component.scss']
})
export class StudentEnrollmentSummaryComponent implements OnInit {
array=null
  sy
  proglevel='ALL'

  enrolled=[]
  admitted=[]
  constructor(public global: GlobalService,private http: Http,public dialog: MatDialog,) { }

  ngOnInit() {
    this.sy=this.global.syear
  }
  generate(){
  		this.array=undefined
		this.http.get(this.global.api+"ReportSummary/EnrollmentSummary/"+this.sy+"?level="+this.proglevel,this.global.option)
		  .map(response => response.json())
		  .subscribe(res => {
		      this.array=[];
		  	if (res.data==null) {
		  		this.global.swalAlert(res.message,'','warning')
		  	}else
		      this.array=res.data;
          this.admitted=[]
          this.enrolled=[]
          if (this.proglevel != 'ALL') {
            this.http.get(this.global.api+"ReportSummary/EnrolledStudentsList/"+this.sy+"/"+this.proglevel+"/ADMITTED",this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.admitted=res.data
                this.http.get(this.global.api+"ReportSummary/EnrolledStudentsList/"+this.sy+"/"+this.proglevel+"/PAID",this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                    this.enrolled=res.data
                  },Error=>{
                    this.global.swalAlertError()
                  });
              },Error=>{
                this.global.swalAlertError()
              });
          }
          
		  },Error=>{
		    this.array=[];
		    this.global.swalAlertError()
		  });
  }

  checkdep(i,depname)
  {
    if (i==0) {
      return true
    }else{
      if (this.array[i-1].departmentName==this.array[i].departmentName){
       return false
      }else
        return true
    }
  }
  checkdep2(i,depname)
  {
    if (this.array.length!=(i+1)) {
      if (this.array[i+1].departmentName==this.array[i].departmentName){
       return false
      }else
        return true
    // code...
    }
    if (this.array.length==(i+1)) {
        return true
      // code...
    }
  }

  gettotal(depname){
    var total = 0
    for (var i = 0; i < this.array.length; ++i) {
      if (this.array[i].departmentName==depname){
        total = total + this.array[i].firstYear
        total = total + this.array[i].secondYear
        total = total + this.array[i].thirdYear
        total = total + this.array[i].fourthYear
        total = total + this.array[i].fifthYear
        total = total + this.array[i].sixthYear
        total = total + this.array[i].f0
        total = total + this.array[i].m0
      }
    }
    return total;
  }
  gettotal1st(depname)
  {
    var total = 0
    for (var i = 0; i < this.array.length; ++i) {
      if (this.array[i].departmentName==depname){
        total = total + this.array[i].firstYear
      }
    }
    return total;
  }gettotal2nd(depname)
  {
    var total = 0
    for (var i = 0; i < this.array.length; ++i) {
      if (this.array[i].departmentName==depname){
        total = total + this.array[i].secondYear
      }
    }
    return total;
  }gettotal3rd(depname)
  {
    var total = 0
    for (var i = 0; i < this.array.length; ++i) {
      if (this.array[i].departmentName==depname){
        total = total + this.array[i].thirdYear
      }
    }
    return total;
  }gettotal4th(depname)
  {
    var total = 0
    for (var i = 0; i < this.array.length; ++i) {
      if (this.array[i].departmentName==depname){
        total = total + this.array[i].fourthYear
      }
    }
    return total;
  }gettotal5th(depname)
  {
    var total = 0
    for (var i = 0; i < this.array.length; ++i) {
      if (this.array[i].departmentName==depname){
        total = total + this.array[i].fifthYear
      }
    }
    return total;
  }gettotal6th(depname)
  {
    var total = 0
    for (var i = 0; i < this.array.length; ++i) {
      if (this.array[i].departmentName==depname){
        total = total + this.array[i].sixthYear
      }
    }
    return total;
  }

  gettotalcourse(course)
  {
    var total = 0
    for (var i = 0; i < this.array.length; ++i) {
      if (this.array[i].course==course){
        total = total + this.array[i].firstYear
      }
    }
    return total;
  }

  gettotalcourse2(course)
  {
    var total = 0
    for (var i = 0; i < this.array.length; ++i) {
      if ('Pre-School'==this.array[i].course){
        total = total + this.array[i].firstYear
      }
      if ('Primary Education'==this.array[i].course){
        total = total + this.array[i].f0 + this.array[i].f0
      }
    }
    return total;
  }
exportexcel(): void 
    {
      var fileName= 'EnrollmentStatistics.xlsx'
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, fileName);	
    }



openDialogAdmitted(x): void {
  var list 
  if (x==0) {
    list = this.admitted
  }else
    list = this.enrolled

    const dialogRef = this.dialog.open(SesPopupComponent, {
          width: '900px', disableClose: false, data:{list:list,check:x,proglevel:this.proglevel,sy:this.sy,x:x}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
        });
    }
}
