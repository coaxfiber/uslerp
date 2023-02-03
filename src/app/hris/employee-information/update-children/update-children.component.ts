import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';

import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-update-children',
  templateUrl: './update-children.component.html',
  styleUrls: ['./update-children.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateChildrenComponent implements OnInit {


	cfname:any='';
	cmname:any='';
	clname:any='';
	cdoBirth:any='';
	SCID:any='';
  cusltid:any='';
  constructor(public dialogRef: MatDialogRef<UpdateChildrenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private global: GlobalService,private http: Http) { }

  ngOnInit() {
  	//console.table(this.data.selectedData);
	  this.cfname=this.data.selectedData.firstName;
    var bdate = new Date(this.data.selectedData.dateOfBirth);
    this.cmname=this.data.selectedData.middleName;
    this.clname=this.data.selectedData.lastName;
    this.cdoBirth=bdate;
    this.SCID=this.data.selectedCID;
    this.cusltid=this.data.selectedData.usltid;
  }
  
  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  click(){
  	console.log();
  }
  
  save(): void 
  {
 	  this.global.swalLoading('Updating Child Info');
    this.http.put(this.global.api+'Employee/Child/'+this.SCID,{
              "firstname": this.cfname,
              "middlename": this.cmname,
              "lastname": this.clname,
              "dateofbirth": this.cdoBirth,
              "usltid": this.cusltid,
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  this.global.swalAlert(res.message,"",'success');
                                  this.dialogRef.close({result:"Update success"});    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
  }
}

