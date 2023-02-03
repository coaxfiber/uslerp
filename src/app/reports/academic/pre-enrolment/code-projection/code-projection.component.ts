import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {ExcelService} from './../../../../academic/curriculum/excel.service';

@Component({
  selector: 'app-code-projection',
  templateUrl: './code-projection.component.html',
  styleUrls: ['./code-projection.component.scss']
})
export class CodeProjectionComponent implements OnInit {
	term=''
	array=null
  dept=''
  constructor(private excelService:ExcelService,public global: GlobalService,private http: Http,) { }

  ngOnInit() {
   
  }
  total(arr,x){
    var totalset=0
    var totallec=0
    var totallab=0
    for (var i = 0; i < arr.length; ++i) {
      totalset=totalset+parseInt(arr[i].numberOfSet)
      totallec=totallec+parseInt(arr[i].lecRooms)
      totallab=totallab+parseInt(arr[i].labRooms)
    }
    if (x==1) {
      return totalset
    }
    if (x==2) {
      return totallec
    }
    if (x==3) {
      return totallab
    }
  }
  checkvisibility(x){
    if (this.global.syear.substring(6)==1) {
      if (x==2) {
       return true
      }
    }else if (this.global.syear.substring(6)==2) {
      if (x==3) {
       return true
      }
      if (x==1) {
       return true
      }
    }else if (this.global.syear.substring(6)==3) {
      if (x==1) {
       return true
      }
    }
    return false
  }

  syDisplay(x){
    var a,b,c
    if (x==1) {
     a = parseInt(this.global.syear.substring(0,4))+1
     c = parseInt(a.toString().substring(0,4))+1
     b = a.toString().substring(0,4) + c.toString().substring(2,4)
     return b + x
    }
     return this.global.syear.substring(0,6) + x
  }

  getcodeprojection(term){
    var x=''
    if (this.term=='') {
      x="Term is required"
    }

    if (x=='') {
  	this.term=term
  	this.array=undefined;
	  this.http.get(this.global.api+'ReportSummary/SubjectProjection/?csy='+this.global.syear+"&projectTerm="+term+"&departmentId="+this.dept,this.global.option)         .map(response => response.json())
	  .subscribe(res => {
	      this.array=res.data;
	  },Error=>{
	    this.array=[];
	    this.global.swalAlertError(Error);
	  });
      // code...
    }else
    this.global.swalAlert(x,"","warning")
  }  
  getnoofset(a,b){
  	var i=0
  	while(a > 0) {
  		a=a-b
  		i++
  	}
  	return i
  }
  export(){
  	  var arr=[]
      for (var i = 0; i < this.array.length; ++i) {
      	arr.push(
      		 {
      		 	"Subject ID": this.array[i].subjectId,
      		 	"Subject Title": this.array[i].subjectTitle,
      		 	"Year Level": this.array[i].yearLevel,
      		 	"Units": this.array[i].units,
      		 	"Course": this.array[i].course,
      		 	"Version": this.array[i].version,
      		 	"Loading Department": this.array[i].loadingDept,
      		 	"Class Size": this.array[i].classSize,
      		 	"Projection": this.array[i].projection,
             "No. of Set": this.array[i].numberOfSet,
             "Lec Rooms": this.array[i].lecRooms,
             "Lab Rooms": this.array[i].labRooms,
      		 }
      		)
      }
      var term
      if (this.term=='1') {
      	term='FirstSem'
      }
      if (this.term=='2') {
      	term='SecondSem'
      }
      if (this.term=='3') {
      	term='Summer'
      }
    this.global.swalClose();
    this.excelService.exportAsExcelFile(arr, 'CodeProjection'+this.global.syear.slice(0,-1)+term);
         
  }
}
