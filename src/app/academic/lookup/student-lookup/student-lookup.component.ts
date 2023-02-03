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
  selector: 'app-student-lookup',
  templateUrl: './student-lookup.component.html',
  styleUrls: ['./student-lookup.component.scss']
})
export class StudentLookupComponent implements OnInit {

  x=1
  arraystud=[];
  keyword=''
  tempkeyword=''

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<StudentLookupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

  ngOnInit() {
  }
  
	select(id,x){
       this.dialogRef.close({result:id,array:x});
	}

	keyDownFunction(event){
		if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
				this.x=0;
  			if (this.keyword != '') {
  				this.tempkeyword=this.keyword;
		  		this.arraystud=undefined;
				this.http.get(this.global.api+'Student/StudentLookup/'+this.keyword+'/'+this.global.domain,this.global.option)
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
