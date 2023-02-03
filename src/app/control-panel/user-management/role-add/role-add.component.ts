import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
  see=0;
  roles:any;
  role:string='';
  access:any;
  temparr:any;
  constructor(public dialogRef: MatDialogRef<RoleAddComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { 
    
   }
  saveRole(){
  	if (this.role!='') {
    this.global.swalLoading('Saving Role...');
  		this.http.post(this.global.api+'Role' ,{
              'name':this.role
            },this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                if (res.message == 'Unable to add role.') {
                  this.global.swalAlert(res.message,'','error');
                }
                else{
                this.global.swalSuccess('Role has been saved!');
                this.see=1;
                this.role='';
              }
                //this.global.swalAlert(res.message,'','success');
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error);
              });
  	}else{
       this.global.swalAlert("Role must not be empty!",'','warning')
    }
   }
  ngOnInit() {
  }
  onNoClick(): void {
       this.dialogRef.close(this.see);
  }
}
