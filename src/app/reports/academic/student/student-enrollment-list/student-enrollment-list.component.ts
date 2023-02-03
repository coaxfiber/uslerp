import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {ExcelService} from './../../../../academic/curriculum/excel.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-student-enrollment-list',
  templateUrl: './student-enrollment-list.component.html',
  styleUrls: ['./student-enrollment-list.component.scss']
})
export class StudentEnrollmentListComponent implements OnInit {
 	proglevel=''
	sy

  	dept=''
	prog=''
	gender=''
	year=''
	type=''

  program=[]
  departments=[]
  departments2=[]
  array=null
  arraytemp=[]

  constructor(private excelService:ExcelService,public global: GlobalService,private http: Http,) { }

ngOnInit() {
  	this.sy=this.global.syear
  	for (var i = 0; i < this.global.departments.length; ++i) {
  		for (var i2 = 0; i2 < this.global.viewdomain.length; ++i2) {
  			if (this.global.departments[i].departmentId==this.global.viewdomain[i2]) {
	  			this.departments2.push(this.global.departments[i])
	  		}
  		}
  	}
  	if (this.global.domain=="ELEMENTARY") {
  		for (var i = 0; i < this.departments2.length; ++i) {
  			if (this.departments2[i].departmentCode=="ELEM"||this.departments2[i].departmentCode=="DKLC") {
  				this.departments.push(this.departments2[i])
  			}
  		}
  	}
  	if (this.global.domain=="HIGHSCHOOL") {
  		for (var i = 0; i < this.departments2.length; ++i) {
  			if (this.departments2[i].departmentCode=="HS") {
  				this.departments.push(this.departments2[i])
  			}
  		}
  	}
  	if (this.global.domain=="GRADUATE SCHOOL") {
  		for (var i = 0; i < this.departments2.length; ++i) {
  			if (this.departments2[i].departmentCode=="GS") {
  				this.departments.push(this.departments2[i])
  			}
  		}
  	}
  	if (this.global.domain=="COLLEGE") {
  		for (var i = 0; i < this.departments2.length; ++i) {
  			if (this.departments2[i].departmentCode!="ELEM"&&this.departments2[i].departmentCode!="DKLC"&&this.departments2[i].departmentCode!="HS"&&this.departments2[i].departmentCode!="GS") {
  				this.departments.push(this.departments2[i])
  			}
  		}
  	}
  	//this.searchlookup(0)
  }
	
searchlookup(repeat,pass=null){
		if (repeat==0) {
			this.program=undefined
			this.prog=''
		}
		var temp = 0
		if (pass==null) {
			if (this.departments[repeat].departmentId!=undefined) {
				pass = this.departments[repeat].departmentId
			}
			temp = 1
		}
        this.http.post(this.global.api+'ReportSummary/Lookup',{
	    	  "ProgramId": "",
			  "CourseCode": "",
			  "ProgramTitle": "",
			  "Major": "",
			  "Version": "",
			  "DepartmentId": pass,
			  "DepartmentCode": "",
			  "DepartmentName": "",
			  "DepartmentGroup": "",
			  "StatusCode": "",
			  "ExactMatch": true
	    	},this.global.option)
	          .map(response => response.json())
	          .subscribe(res => {
	          	if (repeat==0) {
					this.program=[]
				}
	          	this.program = this.program.concat(res.data)
	          	if (repeat<this.departments.length-1&&temp==1) {
	          	   this.searchlookup(repeat+1)
	          	}
	          },Error=>{
   				this.program = [];
	            this.global.swalAlertError();
	          });

   }
  generate(){
  	var year = this.year
  	this.sy = this.global.syear
  	if (this.global.domain=="ELEMENTARY") {
  		this.dept = ''
  		this.sy = this.sy.slice(0, -1)
  	}
  	if (this.global.domain=="HIGHSCHOOL") {
  		this.dept = '0009'
  		this.sy = this.sy.slice(0, -1)
  	}
  	if (this.global.domain=="GRADUATE SCHOOL") {
  		this.dept = '0008'
  	}

		this.array=undefined
		this.http.get(this.global.api+"ReportSummary/EnrollmentList/"+
				this.sy+
				"?department="+this.dept+
				"&programId="+this.prog+
				"&gender="+this.gender+
				"&year="+year+
				"&type="+this.type+
				"&level="+this.global.domain,this.global.option)
		  .map(response => response.json())
		  .subscribe(res => {
		      this.array=[];
		  	if (res.data==null) {
		  		this.global.swalAlert(res.message,'','warning')
		  	}else
		      this.array=res.data;


          this.arraytemp = res.data
          this.idno=''
          this.name=''
          this.fyear=''
          this.fgender=''
          this.fcoursetxt=''
          this.ftypetext=''
          this.fsectiontext=''
          this.fdeptext=''
		      this.fcourse=[]
		      this.ftype=[]
		      this.fsection=[]
		      for (var i = 0; i < res.data.length; ++i) {
		      	if (!this.fcourse.includes(res.data[i].course)) {
		      		this.fcourse.push(res.data[i].course)
		      	}
		      	if (!this.ftype.includes(res.data[i].typeDesc)) {
		      		this.ftype.push(res.data[i].typeDesc)
		      	}
            if (!this.fsection.includes(res.data[i].section)) {
              this.fsection.push(res.data[i].section)
            }
            if (!this.ftype.includes(res.data[i].typeDesc)) {
              this.ftype.push(res.data[i].typeDesc)
            }
            if (!this.fdept.includes(res.data[i].departmentCode)) {
              this.fdept.push(res.data[i].departmentCode)
            }
		      }
		  },Error=>{
		    this.array=[];
		    this.global.swalAlertError()
		  });
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
	fileName= '.xlsx'; 
  exportexcel(): void 
    {
       this.fileName= 'EnrollmentList-'+this.global.syear+ this.fileName
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

 checkyear(x){
 	return x+6
 }
 

  idno=''
  name=''
  fyear=''
  fgender=''
  fcoursetxt=''
  fcourse=[]
  ftypetext=''
  ftype=[]
  fsectiontext=''
  fsection = []
  fdeptext=''
  fdept = []
 keyDownFunction(){
 	this.array = []
 	for (var i = 0; i < this.arraytemp.length; ++i) {
 		if (this.arraytemp[i].idNumber.includes(this.idno) &&
 			(	
 				this.arraytemp[i].lastName+
 				this.arraytemp[i].firstName+
 				this.arraytemp[i].middleName).replace(/\s/g, '').toLowerCase().replace(/,/g, '').includes(this.name.replace(/\s/g, '').toLowerCase().replace(/,/g, '')) &&
	 			
	 			(this.fyear.toLowerCase() == this.arraytemp[i].yearOrGradeLevel.toLowerCase()||this.fyear=='') &&
	 			(this.fgender.toLowerCase() == this.arraytemp[i].gender.toLowerCase() || this.fgender=='')  &&
	 			(this.fcoursetxt.toLowerCase() == this.arraytemp[i].course.toLowerCase() ||this.fcoursetxt=='')&&
        (this.ftypetext.toLowerCase() == this.arraytemp[i].typeDesc.toLowerCase() ||this.ftypetext=='')&&
        (this.fsectiontext.toLowerCase() == this.arraytemp[i].section.toLowerCase() ||this.fsectiontext=='')&&
        (this.fdeptext.toLowerCase() == this.arraytemp[i].departmentCode.toLowerCase() ||this.fdeptext=='')
       ) {
 			this.array.push(this.arraytemp[i])
 		}
 	}
 }

}
