import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-nstp',
  templateUrl: './nstp.component.html',
  styleUrls: ['./nstp.component.scss']
})
export class NstpComponent implements OnInit {
	
	array=null
	sy

  constructor(public global: GlobalService,private http: Http) { }

  ngOnInit() {
  	this.sy=this.global.syear
  }
  generatetemp=false
  generate(){
  	this.generatetemp=true
  	this.array=undefined
		this.http.get(this.global.api+"ReportCHED/NSTPCHED/"+this.sy,this.global.option)
		  .map(response => response.json())
		  .subscribe(res => {
        console.log(res)
		      this.array=[];
		  	if (res.data==null) {
		  		this.global.swalAlert(res.message,'','warning')
		  	}else
		      this.array=res.data;
  			this.generatetemp=false
		  },Error=>{
  			this.generatetemp=false
		    this.array=[];
		    this.global.swalAlertError(Error)
		  });
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

  exportexcel(){


var wscols = [
    {wch:6},
    {wch:15},
    {wch:15},
    {wch:15},
    {wch:15},
    {wch:12},
    {wch:10},
    {wch:15},
    {wch:20},
    {wch:20},
    {wch:20},
    {wch:15},
    {wch:25},
    {wch:10},
    {wch:30}
];

      var fileName= 'CHED-NSTP-'+this.sy+'.xlsx'
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element,  {raw:true});
        ws['!cols'] = wscols;
       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'NSTP Enrollees');


       /* save to file */
       XLSX.writeFile(wb, fileName);
  }
}

   