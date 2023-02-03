import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-select-set-options',
  templateUrl: './select-set-options.component.html',
  styleUrls: ['./select-set-options.component.scss']
})
export class SelectSetOptionsComponent implements OnInit {
  res=[]
  constructor(public dialogRef: MatDialogRef<SelectSetOptionsComponent>,@Inject(MAT_DIALOG_DATA) public data2: any,public global: GlobalService,private http: Http) { 
 	for (var i = 0; i < data2.length; ++i) {
		if (!this.res.includes(data2[i].codeNo)&&data2[i].availableSlot>0) {
			this.res.push(data2[i].codeNo)
		}
 	}
  }

  ngOnInit() {
  }

  onNoClickclose(): void {
       this.dialogRef.close({result:'cancel'});
  }

  showhide(x){
  	if (x==0) {
  		return false
  	}else{
  		if (this.data2[x].codeNo==this.data2[x-1].codeNo) {
  			return true
  		}else
  			return false
  	}
  }

  checkdisabled(x){
  	if (x<=0) {
  		return true
  	}
  		return false
  }

  checkthis(x){
  	if (x<=0) {
  		return false
  	}
  	return true
  }

  clickcheck(x){
  	if (this.res.includes(this.data2[x].codeNo)) {
  		this.res.splice( this.res.indexOf(this.data2[x].codeNo), 1 );
  	}else{
		this.res.push(this.data2[x].codeNo)
  	}
  }

  confirm(){
  	var res=[]
  	for (var i = 0; i < this.data2.length; ++i) {
  		if (this.res.includes(this.data2[i].codeNo)) {
  			res.push(this.data2[i])
  		}
  	}
    this.dialogRef.close({result:'success',data:res});
  }
}
