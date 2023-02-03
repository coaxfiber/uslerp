import { Component, OnInit,ViewChild } from '@angular/core';
import { GlobalService } from './../../global.service';
import Swal from 'sweetalert2';
const swal = Swal;
import * as XLSX from 'xlsx';
import {Http, Headers, RequestOptions} from '@angular/http';

type AOA = any[][];

@Component({
  selector: 'app-section-manager',
  templateUrl: './section-manager.component.html',
  styleUrls: ['./section-manager.component.scss']
})
export class SectionManagerComponent implements OnInit {

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
                for (var i2 = 0; i2 < this.data.length; ++i2) {
                  if(this.data[i2][3]==undefined){
                    this.data[i2][3] = 'xxx'
                  }
                  if(this.data[i2][4]==undefined){
                    this.data[i2][4] = 'xxx'
                  }
                  if(this.data[i2][5]==undefined){
                    this.data[i2][5] = 'xxx'
                  }

                  if(this.data[i2][0]==undefined){
                    break
                  }
                    this.firstdata.push(this.data[i2])
                }
                console.log(this.firstdata.length)
          }else{
            this.firstdata =[]
          	this.global.swalAlert('Invalid Excel File!','','warning')
          }
          // if (this.data[0][6].toString().toLowerCase()=='instructor') {
          //    error=error+"*Instructor header not found. <br>"
          // }


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
    this.swalConfirm("Upload Confirmation!",'You are about to upload section of Students for <br><b>'+this.global.syDisplay(syear)+'</b>','info','Yes')
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
          this.insertsection(0)
        }
      })
  }
  insertsection(length){
  	if (length<this.firstdata.length) {
      var syear=''
       if (this.global.syear.length == 7) {
              syear = this.global.syear.slice(0, -1)
       }

       if (this.firstdata[length][3]==''||this.firstdata[length][3]==undefined) {
         this.firstdata[length][3]='(unassigned)'
       }

       if (this.firstdata[length][0]!=''&&this.firstdata[length][0]!=undefined) {
        this.http.put(this.global.api+'Student/Section/'+this.firstdata[length][0],{
            "SchoolYear": syear,
            "Section": this.firstdata[length][3]
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
  		this.global.swalAlert("Sections uploaded!",'','success')
  	}
  }

  funcDelete(){
  	this.firstdata=[]
  	this.data=[]
  }

  GetID(x)
  {
    if(x.toString().toLowerCase().includes("click")){
      return 29
    }
    if(x.toString().toLowerCase().includes("time")){
      return 10
    }
    if(x.toString().toLowerCase().includes("pawnee")){
      return 21
    }
    if(x.toString().toLowerCase().includes("balboa")){
      return 27
    }
    if(x.toString().toLowerCase().includes("navitas")){
      return 25
    }
    if(x.toString().toLowerCase().includes("channel")){
      return 44
    }
    if(x.toString().toLowerCase().includes("amur")){
      return 48
    }

    if(x.toString().toLowerCase().includes("centra")){
      return 23
    }

    if(x.toString().toLowerCase().includes("bsb")){
      return 43
    }
    if(x.toString().toLowerCase().includes("ncmic")){
      return 7
    }
    
    return x
  }

  getstatid(a,b,z){
    if(z=='stat'){
      if(b==1)
        return 4
      if(b==2)
        return 2
        if(b==3)
        return 3
    }
    else{
      return a
    }
  }
}
