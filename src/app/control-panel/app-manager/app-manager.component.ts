import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import Swal from 'sweetalert2';
const swal = Swal;


import { AddUpdateAppComponent } from './add-update-app/add-update-app.component';

@Component({
  selector: 'app-app-manager',
  templateUrl: './app-manager.component.html',
  styleUrls: ['./app-manager.component.scss']
})
export class AppManagerComponent implements OnInit {
	array=[]
  constructor(public global: GlobalService,private http: Http,public dialog: MatDialog) { }

  ngOnInit() {
    this.createTable();
  }

  createTable(){
	this.array=undefined;
  	this.http.get(this.global.api+"ClientApplication",this.global.option)
		  .map(response => response.json())
		  .subscribe(res => {
		      this.array=[];
		  	if (res.data==null) {
		  		this.global.swalAlert(res.message,'','warning')
		  	}else
		      this.array=res.data;
		  },Error=>{
		    this.array=[];
		    this.global.swalAlertError()
		  });
  }

openDialogUpdate(data,type): void {
    const dialogRef = this.dialog.open(AddUpdateAppComponent, {
      width: '650px',data:{data:data,type:type}, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result!=undefined) {
        if (result==1) {
          this.createTable();
        }
      }
    });
  }

  removeapp(id){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove Application','Application has been Removed','','role',id);
  }
  
  swalConfirm(title,text,type,button,d1,d2,remove,id)
  {
    swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
          if (remove=='role') {
          	this.global.swalLoading('')
            this.http.delete(this.global.api+'ClientApplication/'+id,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
              	this.global.swalClose()
                this.createTable();
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
  }
}
