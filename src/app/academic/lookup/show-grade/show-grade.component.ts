import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-show-grade',
  templateUrl: './show-grade.component.html',
  styleUrls: ['./show-grade.component.scss']
})
export class ShowGradeComponent implements OnInit {

  gradearray
  constructor(public dialogRef: MatDialogRef<ShowGradeComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { 
 
  }

  ngOnInit() {
  	this.http.get(this.global.api+'Student/AcademicHistory/'+this.data.id,this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  this.gradearray = res.data
                  //console.log(res)
                },Error=>{
                  //console.log(Error);
                  console.log(Error)
                  this.global.swalAlertError()
                });
  }
  x=''
  sy(x){
  	if (this.x.substring(0,6)==x.substring(0,6)) {
  		this.x=x
  		return false
  	}else
  	{
  		this.x=x
  		return true
  	}
  }
  y=''


  sem(y){
  	if (this.y==y) {
  		this.y=y
  		return false
  	}else
  	{
  		this.y=y
  		return true
  	}

  }
 yy=''

 sem2(y,i){
 	if (this.gradearray[i+1]!=undefined) {
	 	if (this.gradearray[i].schoolYear!=this.gradearray[i+1].schoolYear) {
			  return true
	 	}
		 return false
 	}
 	return true
  }


  track
  average=0;
  count=0;
 

  calcgrade(y){
  	var average=0
  	var count=0
  	for(var i = 0; i < this.gradearray.length; i++) {
    if (this.gradearray[i].schoolYear == y) {
    	var x;
    	if (this.gradearray[i].grade.replace(/\D/g, "")=='') {
    		x=0
    	}else x= parseInt(this.gradearray[i].grade.replace(/\D/g, ""));
        average = average + x*parseFloat(this.gradearray[i].units);
        count=count +parseFloat(this.gradearray[i].units);
	    }
	}
	return "Average: "+(Math.floor((average/count)*100)/100).toFixed(2).toString() + "%"
  }


  getsy(sem){
	 var y = parseInt(sem.substring(0,4)) + 1;
	 return  "SY " + sem.substring(0,4) + "-" + y
  }
  getsem(sem){
  	 if (sem.substring(6)=='1')
	   return "1st Semester";
	 else if (sem.substring(6)=='2')
	   return "2nd Semester";
	 else
	   return "Summer";
  }

  
  onNoClickclose(): void {
       this.dialogRef.close({result:'cancel'});
  }
}
