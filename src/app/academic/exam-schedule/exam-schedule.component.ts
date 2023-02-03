import { Component, OnInit,ViewChild } from '@angular/core';
import { GlobalService } from './../../global.service';
import Swal from 'sweetalert2';
const swal = Swal;
import * as XLSX from 'xlsx';
import {Http, Headers, RequestOptions} from '@angular/http';

import {PurgeServicesService} from './../purging/purge-services.service';
type AOA = any[][];

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.scss']
})
export class ExamScheduleComponent implements OnInit {
  tableArr=null
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
@ViewChild('uploadthis') uploadthis;



  exportAsXLSX():void {
    var array= []
    for (var i = 0; i < this.firstdata.length; ++i) {
      array.push(
          {
            'Code': this.firstdata[i].codeNo,
            'Subject ID': this.firstdata[i].subjectId,
            'Descriptive Title': this.firstdata[i].title,
            'Day': new Date(this.firstdata[i].day),
            'Time': this.firstdata[i].time,
            'Room': this.firstdata[i].roomNumber,
          }
        )
      }
   this.excelService.exportAsExcelFile(array, 'ExamSchedule-list');
  }
  constructor(private excelService:PurgeServicesService,public global: GlobalService,private http: Http) { }
  datadisplay=undefined
  savetemp = false
  onFileChange(evt: any) { 
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      this.global.swalClose()
      /* read workbook */
        this.data=[]
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { 
        type: 'binary',
    		cellDates: true,
    		dateNF: 'dd/mm/yyyy' 
	     });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        this.data=[]
      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.global.swalClose()
      this.uploadthis.nativeElement.value=''
       // console.log(this.data)
        if (this.data[0][0].toLowerCase()!='code') {
        	this.data=[]
        }
          var error=''
          var temp1=true
          if (this.data[0]!=undefined) {
            if (this.data[0][0].toString().toLowerCase()!='code') {
               error=error+"*Code header not found. <br>"
               temp1=false
            }
          }
          if (this.data[0]!=undefined) {
            if (this.data[0][1].toString().toLowerCase()!='subject id') {
               error=error+"*Subject ID header not found. <br>"
               temp1=false
            }
          }
          if (this.data[0]!=undefined) {
            if (this.data[0][2].toString().toLowerCase()!='descriptive title') {
               error=error+"*Descriptive title header not found. <br>"
               temp1=false
            }
          }
          if (this.data[0]!=undefined) {
            if (this.data[0][3].toString().toLowerCase()!='day') {
               error=error+"*Day header not found. <br>"+this.data[0][3].toString().toLowerCase()
               temp1=false
            }
          }
          if (this.data[0]!=undefined) {
            if (this.data[0][4].toString().toLowerCase()!='time') {
               error=error+"*Time header not found. <br>"
               temp1=false
            }
          }
          if (this.data[0]!=undefined) {
            if (this.data[0][5].toString().toLowerCase()!='room') {
               error=error+"*Room header not found. <br>"
               temp1=false
            }
          }
          // if (this.data[0][6].toString().toLowerCase()=='instructor') {
          //    error=error+"*Instructor header not found. <br>"
          // }
          this.datadisplay=[]
          if (temp1) {
            this.data.shift();
            this.datadisplay=[]

                  var yearnow = new Date()
                  var year = yearnow.getFullYear();

           var datecount=-1;
          for (var i = 0; i < this.data.length; ++i) {
          	 var javaScriptRelease = Date.parse(this.data[i][3])+ 40400000;
         	   var s13 = new Date(javaScriptRelease)

              	  var mm = s13.getMonth() + 1;
            		  var dd = s13.getDate();
            		  var yyyy = s13.getFullYear();
            		  var format = mm + '/' + dd + '/' + yyyy
              	  this.data[i][3] = format;

              	 if (this.data[i][3].toString()!="NaN/NaN/NaN") {
              	 	this.datadisplay.push(this.data[i])
              	 }else{
                   datecount++;
                 }
                 if (this.data[i][0]!=undefined) {
                   if (this.data[i][0].toString().toLowerCase().length!=3) {
                     this.datadisplay = []
                     error=error+"*Code Error. Validate the codes in the excel file."
                     i=this.data.length;
                   }

                   if (year-yyyy>2) {
                       this.datadisplay = []
                       error=error+"*Date Error. Validate the dates in the excel file."
                       datecount=0
                       i=this.data.length;
                   }
                 }
                 console.log(this.data[i].length)
                 if (this.data[i].length==4) {
                   i=this.data.length;
                 }
              }    
          }
          if (datecount>0) {
            this.datadisplay = []
            error=error+"*Date Error. Validate the dates in the excel file."
          }
          if (this.datadisplay.length!=0) {
      	   this.savetemp = true
          }
          if (error!='') {
            this.global.swalAlert(error,'','warning')
          }

    };
    reader.readAsBinaryString(target.files[0]);

  }

  firstdata=undefined
  ngOnInit() {
  	this.loadexam()
  }
  loadexam(){

	this.savetemp=false
  	this.firstdata=undefined
  	this.datadisplay=undefined
  	this.http.get(this.global.api+'Code/ExamSchedule',this.global.option)
              .map(response => response.json())
              .subscribe(res => {
              	this.firstdata=res.data
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
  }

  funcSave(){
    this.swalConfirm("You are about to replace the exam schedules","You won't be able to revert this!",'warning','Save','Exam schedules has been saved','','sy');
  }
  funcDelete(){
    this.swalConfirm("You are about to clear the exam schedules","You won't be able to revert this!",'warning','Clear','Exam schedules has been cleared','','del');
  }
  
  swalConfirm(title,text,type,button,d1,d2,remove)
  {
    swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
          if (remove=='sy') {
  		 this.global.swalLoading("Uploading Schedule...")
          	this.http.delete(this.global.api+'Code/ExamSchedule',this.global.option)
              .map(response => response.json())
              .subscribe(res => {
            		this.insertexamsched(0)
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
          if (remove=='del') {
  		 this.global.swalLoading("")
          	this.http.delete(this.global.api+'Code/ExamSchedule',this.global.option)
              .map(response => response.json())
              .subscribe(res => {
    				    this.global.swalSuccess(res.message)
  		  		    this.loadexam()
  		  		    this.savetemp=false
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
  }
  insertexamsched(length){
  	if (length<this.datadisplay.length) {
  		this.http.post(this.global.api+'Code/ExamSchedule',{
				  "codeNo": this.datadisplay[length][0],
				  "date": this.datadisplay[length][3],
				  "time": this.datadisplay[length][4],
				  "roomNo": this.datadisplay[length][5],
				},this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.insertexamsched(length+1)
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
  	}else{
  		this.loadexam()
  		this.savetemp=false
  		this.global.swalClose()
  		this.global.swalSuccess("Exam schedules uploaded!")
  	}
  }
}
