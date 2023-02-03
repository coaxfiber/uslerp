import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-add-update-app',
  templateUrl: './add-update-app.component.html',
  styleUrls: ['./add-update-app.component.scss']
})
export class AddUpdateAppComponent implements OnInit {
  access=[]
  appname=''
  apppassword=''
  temparr
  constructor(public dialogRef: MatDialogRef<AddUpdateAppComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { 
   
  }

  check(access,accessId){
    let index = this.temparr.findIndex(e => e.id === access.id);
    if (index > -1) {
      if(this.temparr[index].actions.some(e => e.id === accessId)){
        return true
      }else return false;
      // code...
    }else return false;
    //console.log(this.temparr[index].actions.some(e => e.id === accessId))
  }
  ngOnInit() {
  	if (this.data.type==2) {
	  	this.appname = this.data.data.userName
	  	this.temparr = this.data.data.selectedControllers;
  	}
  	if (this.data.type==3) {
	  	this.appname = this.data.data.userName
	  	this.temparr = this.data.data.selectedControllers;
 		this.global.swalLoading('Loading Access List...');
        this.http.get(this.global.api+'ClientApplication/AccessLists',this.global.option)
           .map(response => response.json())
          .subscribe(res => {
            this.access = res;
            this.global.swalClose();
          },Error=>{
            this.global.swalClose();
            this.global.swalAlertError();
          });
  	}
  }

  onNoClick(): void {
    this.dialogRef.close(undefined);
  }


  resetpassword(xy){
  	var x=''
  	if (this.appname=='') {
  		x=x+'*Application Name is required<br>'
  	}
  	if (this.apppassword=='') {
  		x=x+'*Password is required<br>'
  	}

  	if (x=='') {
  		this.global.swalLoading('')
  		if (xy==1) {
	       this.http.post(this.global.api+'ClientApplication',{
			  "userName": this.appname,
			  "passwordHash": this.apppassword
	       },this.global.option)
	           .map(response => response.json())
	          .subscribe(res => {
	            this.global.swalClose();
    			this.dialogRef.close(1);
	            this.global.swalSuccess(res.message)
	          },Error=>{
	            this.global.swalClose();
	            this.global.swalAlertError();
	          });
  		}else{
  			this.http.put(this.global.api+'ClientApplication/'+this.data.data.id,{
			  "userName": this.appname,
			  "passwordHash": this.apppassword
	       },this.global.option)
	           .map(response => response.json())
	          .subscribe(res => {
	            this.global.swalClose();
    			this.dialogRef.close(1);
	            this.global.swalSuccess(res.message)
	          },Error=>{
	            this.global.swalClose();
	            this.global.swalAlertError();
	          });
  		}
  	}else{
  		this.global.swalAlert(x,'','warning')
  	}

  }

  assign(){
  		this.global.swalLoading('')
  		this.http.put(this.global.api+'ClientApplication/Access/'+this.data.data.id,{
			  "selectedControllers":this.temparr
	       },this.global.option)
	           .map(response => response.json())
	          .subscribe(res => {
	            this.global.swalClose();
	            this.global.swalSuccess(res.message)
	          },Error=>{
	            this.global.swalClose();
	            this.global.swalAlertError();
	          });
  }

   tempArray(access,accessControl,event){
    let index = this.temparr.findIndex(e => e.id === access.id);
    if (index==-1) {
      this.temparr.push(
        {id:access.id,
          name:access.name,
          displayName:access.displayName,
          areaName:access.areaName,
          actions:[{
            0:{
            controllerId: ":temp",
            displayName: "temp",
            id: ":temp",
            name: "temp"}}]
          });
      this.temparr[this.temparr.length-1].actions[0] = accessControl;
    }
    else {
      if(this.temparr[index].actions.some(e => e.id === accessControl.id)){
        let aCindex=this.temparr[index].actions.findIndex(item => item.id === accessControl.id);
        this.temparr[index].actions.splice(aCindex, 1);
        if (this.temparr[index].actions.length==0) {
         this.temparr.splice(index, 1);
        }
      }else{
        this.temparr[index].actions.push(accessControl);
      }
      // code...
    }

    //console.log(this.temparr[index].actions.findIndex(e => e.id === accessControl.id))
    //console.log(this.temparr)
  }
}
