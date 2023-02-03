import { Component, OnInit,ViewChild } from '@angular/core';
import { GlobalService } from './../../global.service';
import Swal from 'sweetalert2';
const swal = Swal;
import * as XLSX from 'xlsx';
import {Http, Headers, RequestOptions} from '@angular/http';

type AOA = any[][];

@Component({
  selector: 'app-hs-class-schedule',
  templateUrl: './hs-class-schedule.component.html',
  styleUrls: ['./hs-class-schedule.component.scss']
})
export class HsClassScheduleComponent implements OnInit {

 tableArr=null
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  @ViewChild('uploadthis') uploadthis;
  constructor(public global: GlobalService,private http: Http) { }
  datadisplay=undefined
  savetemp = false
  onFileChange(evt: any) { 
    /* wire up file reader */
  	this.firstdata=undefined
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

          var error=''
          var temp1=true

          if (this.data[0]!=undefined) {

                this.firstdata =[]
            		this.data.shift();
                var temptime=''
                var tempday=''
                for (var i2 = 0; i2 < this.data.length; ++i2) {
                  if (this.data[i2].length!=0) {
                    if (this.data[i2][3]!=undefined&&this.data[i2][3]!='') {
                      temptime = this.data[i2][3]
                      tempday = this.data[i2][4]
                    }
                    else{
                      this.data[i2][3]=temptime
                      this.data[i2][4]=tempday
                    }

                    var x=''
                    if (this.data[i2][0].toString().length == 6) {
                      x = "0"+this.data[i2][0].toString()
                      this.data[i2][0] = x
                    }
                    if (this.data[i2][5]!=undefined) {
                      this.data[i2][5].toUpperCase()
                    }else
                      this.data[i2][5] = ' '
                      
       if (this.data[i2][6]!=undefined) {
         if (this.data[i2][6].toString().length==1) {
         this.data[i2][6] = '000000'+ this.data[i2][6].toString()
         }
         if (this.data[i2][6].toString().length==2) {
           this.data[i2][6] = '00000'+ this.data[i2][6].toString()
         }
         if (this.data[i2][6].toString().length==6) {
           this.data[i2][6] = '0'+ this.data[i2][6].toString()
         }
       }else{
           this.data[i2][6] = ''
       }
       
       
       if (this.data[i2][2]!=undefined) {  
         if (this.data[i2][2].toString().length==1) {
           this.data[i2][2] = '000000'+ this.data[i2][2].toString()
         }
         if (this.data[i2][2].toString().length==2) {
           this.data[i2][2] = '00000'+ this.data[i2][2].toString()
         }
         if (this.data[i2][2].toString().length==6) {
           this.data[i2][2] = '0'+ this.data[i2][2].toString()
         }
       }else{
           this.data[i2][2] = ''
       }

       if (this.data[i2][3]==undefined) {
         this.data[i2][3]=' '
       }
       if (this.data[i2][4]==undefined) {
         this.data[i2][4]=' '
       }
                    this.firstdata.push(this.data[i2])
                  }
                }
          }else{
            this.firstdata =[]
          	this.global.swalAlert('Invalid Excel File!','','warning')
          }
    };
    reader.readAsBinaryString(target.files[0]);

  }

  firstdata=undefined
  ngOnInit() {
  	this.loadexam()
  }


  loadexam(){
  	this.firstdata=[]
  }
  funcSave(){
    var syear=''
       if (this.global.syear.length == 7) {
              syear = this.global.syear.slice(0, -1)
       }
    this.swalConfirm("Upload Confirmation!",'You are about to upload schedules for <br><b>'+this.global.syDisplay(syear)+'</b><br><br>This will overwrite the previous data!','info','Yes')
  }
  swalConfirm(title,text,type,button)
  {
    swal.fire({
        title: title,
        html: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
          this.global.swalLoading('Uploading '+this.firstdata.length+' Records...')
          this.http.delete(this.global.api+'Maintenance/Schedule/BasicEd/'+this.firstdata[0][0]+'/'+this.global.syear.slice(0, -1),this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.insertsection(0)
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
        }
      })
  }
  insertsection(length){
  	if (length<this.firstdata.length) {
       var syear=''
       if (this.global.syear.length == 7) {
              syear = this.global.syear.slice(0, -1)
       }

       if (this.firstdata[length][0]!=''&&this.firstdata[length][0]!=undefined) {
        this.http.post(this.global.api+'Maintenance/Schedule/BasicEd',{
    		  "SchoolYear": syear,
    		  "GradeLevel": this.firstdata[length][0],
    		  "Section": this.firstdata[length][1],
    		  "AdviserId": this.firstdata[length][2],
    		  "Time":  this.firstdata[length][3],
    		  "Day":  this.firstdata[length][4],
    		  "Subject":  this.firstdata[length][5].toUpperCase(),
    		  "TeacherId":  this.firstdata[length][6],
    		},this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.insertsection(length+1)
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
       }else{
          this.insertsection(length+1)
       }
  		
  	}else{
  		this.global.swalClose()
  		this.global.swalAlert("Schedules uploaded!",'','success')
  	}
  }

  funcDelete(){
  	this.firstdata=[]
  	this.data=[]
  }
}
