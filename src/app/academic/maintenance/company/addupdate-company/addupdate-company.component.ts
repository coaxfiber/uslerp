import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { AddressLookupComponent } from './../../../../academic/student-information/address-lookup/address-lookup.component';

@Component({
  selector: 'app-addupdate-company',
  templateUrl: './addupdate-company.component.html',
  styleUrls: ['./addupdate-company.component.scss']
})
export class AddupdateCompanyComponent implements OnInit {

constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<AddupdateCompanyComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

	cname=''
	psgc=''
	educ=false
	address=''
  ngOnInit() {
  	if (this.data.type==1) {
  		this.cname = this.data.data.companyName
  	}
  }

  addresslookup(){
    const dialogRef = this.dialog.open(AddressLookupComponent, {
      width: '500px', disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.result!='cancel') {
          this.psgc = result.data;
          this.address = result.result;
      }
    });
  }
  close(): void {
       this.dialogRef.close({result:'cancel'});
  }

  save(){
  	var x = ''
  	if (this.cname == '') {
  		x=x+'*Company name is required<br>'
  	}
  	if (x=='') {
		this.http.post(this.global.api+'/Maintenance/Company' ,{
		  "CompanyName": this.cname,
		  "Address": "",
		  "isEducationalInstitution": this.educ
	    },this.global.option)
	          .map(response => response.json())
	          .subscribe(res => {
		       	this.global.swalSuccess(res.message) 
	       		this.dialogRef.close({result:'save'});   
		       },Error=>{
	            //console.log(Error);
	            this.global.swalAlertError();
	            console.log(Error)
	          });
  		// code...
  	}else{
  		this.global.swalAlert("Please fill in the required fields.",x,'warning')
  	}
  }
  update(){
  	var x = ''
  	if (this.cname == '') {
  		x=x+'*Company name is required<br>'
  	}
  	if (x=='') {
		this.http.put(this.global.api+'/Maintenance/Company/'+this.data.data.companyId ,{
		  "CompanyName": this.cname,
		  "Address": "",
		  "isEducationalInstitution": this.educ
	    },this.global.option)
	          .map(response => response.json())
	          .subscribe(res => {
		       	this.global.swalSuccess(res.message) 
	       		this.dialogRef.close({result:'save'});   
		       },Error=>{
	            //console.log(Error);
	            this.global.swalAlertError();
	            console.log(Error)
	          });
  		// code...
  	}else{
  		this.global.swalAlert("Please fill in the required fields.",x,'warning')
  	}
  }
}
