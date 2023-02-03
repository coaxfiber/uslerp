import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import {HttpParams} from  "@angular/common/http";
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

	year1;
	year2;
	activeterm=''

  constructor(public dialog: MatDialog,private http: Http,private global: GlobalService,public dialogRef: MatDialogRef<UpdateComponent>,@Inject(MAT_DIALOG_DATA) public data: any,) { 
  }

  ngOnInit() {

    var dt = new Date();
    this.year1 = dt.getFullYear()
    this.yearchange1()
  }


yearchange1(){
     	this.year2=this.year1+1;
     }
     yearchange2(){
     	this.year1=this.year2-1;
     }
  onNoClickclose(): void {
       this.dialogRef.close({result:'cancel'});
  }

  Addsy(){
  	if (this.activeterm=='') {
  		alert("*Active term is required!")
  	}
  	else{

	  	var year = this.year1.toString() + this.year2.toString().substring(2,4) + this.activeterm;
	  		var found = false;
			for(var i = 0; i < this.data.data.length; i++) {
			    if (this.data.data[i].syWithSem == year) {
			        found = true;
			        break;
			    }
			}
		if (found) {
			this.global.swalAlert('Adding failed!','School year already Exist!', 'warning')
		}else{
			this.global.swalLoading('');

		    this.http.post(this.global.api+'Maintenance/SYSettings/'+year,{},this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.dialogRef.close({result:'success'});
                this.global.swalSuccess(res.message)
            },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
		}
	}
  }

}
