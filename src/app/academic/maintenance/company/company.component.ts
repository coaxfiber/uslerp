import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import Swal from 'sweetalert2';import { map } from 'rxjs/operators';
const swal = Swal;
import { AddupdateCompanyComponent } from './addupdate-company/addupdate-company.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
	tablearray=[]
	companyarray=[]
	search=''
	pagesize=50
	pageno=1
	totalpageno=0
	constructor(public global: GlobalService,private http: Http,public dialog: MatDialog) { }

	getcompanylist(){
	  this.tablearray=undefined;
	  this.http.get(this.global.api+'Maintenance/Company?companyName='+this.search+'&pageSize='+this.pagesize+"&pageNumber="+this.pageno,this.global.option)
	          .map(response => response.json())
	          .subscribe(res => {
	          	console.log(res)
	          	
	          	if (res.data.length==0) {
	          	 	this.totalpageno = 0
		            this.companyarray = [];
		            this.tablearray = []
	          	} else{
	          		this.totalpageno = res.data[0].totalPageNo
		            this.companyarray = res.data;
		            this.tablearray = res.data;
	          	}
  				//this.keyDownFunction('event')
	          },Error=>{ this.tablearray=[];this.global.swalAlertError(); });  
	}
  ngOnInit() {
  	this.getcompanylist()
  }

keyDownFunction(event){

   if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
      this.getcompanylist()
      this.pagesize=50
      this.pageno=1
    }
   }

delcompany(x,id){
    this.swalConfirm("You are about to delete company "+x+"?","You won't be able to revert this.",'warning','Delete',""+x+" company has been deleted.",'delete',id);
}

 swalConfirm(title,text,type,button,successm,remove,id){
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
          if (remove=='delete') {
          	this.global.swalLoading('')
             this.http.delete(this.global.api+'Maintenance/Company/'+id,this.global.option)
                .map(response => response.text())
                .subscribe(res => {
                	this.global.swalClose()
  					this.getcompanylist()
                },Error=>{
                  console.log(Error)
                  this.global.swalAlertError()
                });
          }
        }
      })
  }


  openDialog(type,data=null): void {
    const dialogRef = this.dialog.open(AddupdateCompanyComponent, {
          width: '700px', disableClose: false , data:{data:data,type:type}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='save') {
  				this.getcompanylist()
            }
          }
        });
    }
}
