import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {PurgeServicesService} from './purge-services.service';
import Swal from 'sweetalert2';import { map } from 'rxjs/operators';
const swal = Swal;


@Component({
  selector: 'app-purging',
  templateUrl: './purging.component.html',
  styleUrls: ['./purging.component.scss']
})
export class PurgingComponent implements OnInit {
	 purge=[]
   message=''
  constructor(private excelService:PurgeServicesService,public global: GlobalService,private http: Http,public dialog: MatDialog) { }

	getpurglist(){
	  this.purge=undefined;
	  this.http.get(this.global.api+'Enrollment/PurgeList/'+this.global.syear+'/'+this.global.domain,this.global.option)
	          .map(response => response.json())
	          .subscribe(res => {
	            this.purge = res.data;
              this.message=res.message
	          },Error=>{ this.purge=[];this.global.swalAlertError(); });  
	}
  ngOnInit() {
  	this.getpurglist()
  }
  exportAsXLSX():void {
   this.excelService.exportAsExcelFile(this.purge, 'purge-list');
  }
purgethis(){
    this.swalConfirm("You are about to purge "+this.purge.length+" student's enrollment record.","You won't be able to revert this.",'warning','Purge',""+this.purge.length+" student's enrollment record has been purged.",'purge');
}
 swalConfirm(title,text,type,button,successm,remove){
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
          if (remove=='purge') {
          	this.global.swalLoading('')
          	if (this.global.domain=="COLLEGE") {
             this.http.delete(this.global.api+'Enrollment/Purge/'+this.global.syear,this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                	this.global.swalSuccess(res.message)
                	this.getpurglist()
                },Error=>{
                  console.log(Error)
                  this.global.swalAlertError()
                });
          	}
          	if (this.global.domain=="GRADUATE SCHOOL") {
             this.http.delete(this.global.api+'Enrollment/PurgeGS/'+this.global.syear,this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  this.global.swalSuccess(res.message)
                	this.getpurglist()
                },Error=>{
                  //console.log(Error);
                  console.log(Error)
                  this.global.swalAlertError()
                });
          	}
          }
        }
      })
  }

}
