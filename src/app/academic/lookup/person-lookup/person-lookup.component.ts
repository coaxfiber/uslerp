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
  selector: 'app-person-lookup',
  templateUrl: './person-lookup.component.html',
  styleUrls: ['./person-lookup.component.scss']
})
export class PersonLookupComponent implements OnInit {


  x=1
  arraystud=[];
  keyword=''
  tempkeyword=''

  exactmatch = false

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<PersonLookupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

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
				this.http.get(this.global.api+'Person/Lookup/'+this.keyword+'/'+this.exactmatch,this.global.option)
		                  .map(response => response.json())
		                  .subscribe(res => {
		                  	console.log(res)
		                    this.arraystud=res.data[0]
		                    this.arraystud=this.arraystud.concat(res.data[1])
		                    this.arraystud=this.arraystud.concat(res.data[2])
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
