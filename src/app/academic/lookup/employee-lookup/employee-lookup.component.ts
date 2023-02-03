import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';

import Swal from 'sweetalert2';
const swal = Swal;
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
import { LookupCodeComponent } from './../../enrollment-manager/lookup-code/lookup-code.component';

@Component({
  selector: 'app-employee-lookup',
  templateUrl: './employee-lookup.component.html',
  styleUrls: ['./employee-lookup.component.scss']
})
export class EmployeeLookupComponent implements OnInit {

  x=1
  arraystud=[];
  keyword=''
  tempkeyword=''

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<EmployeeLookupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

  ngOnInit() {
  }
	select(id){
       this.dialogRef.close({result:id});
	}

	keyDownFunction(event){
		if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
				this.x=0;
  			if (this.keyword != '') {
  				this.tempkeyword=this.keyword;
		  		this.arraystud=undefined;
				this.http.get(this.global.api+'Employee/EmployeeLookup/'+this.keyword,this.global.option)
		                  .map(response => response.json())
		                  .subscribe(res => {
		                    this.arraystud=res.data
		                });
		              }
		          }
	}


   close(): void {
       this.dialogRef.close({result:'cancel'});
  }
	keyDownFunctionCODE(event){
    	if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
    		if (this.keyword=='') {
          	}else{
        		    this.keyDownFunction('onoutfocus');
          	}
    	}
	}
}
