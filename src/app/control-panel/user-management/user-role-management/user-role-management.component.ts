import { Component, OnInit } from '@angular/core';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-user-role-management',
  templateUrl: './user-role-management.component.html',
  styleUrls: ['./user-role-management.component.scss']
})

export class UserRoleManagementComponent implements OnInit {
	temparr:any=[];
	roles:any;
  userId:any;
	 dataSource;

displayedColumns = ['name','filter'];
      @ViewChild(MatSort) sort: MatSort;
       @ViewChild('paginator') paginator: MatPaginator;


  constructor(public dialogRef: MatDialogRef<UserRoleManagementComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { 
  		
    this.global.swalLoading('Loading Access List...');
        this.http.get(this.global.api+'Role/Roles',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.roles=res;
            this.dataSource = new MatTableDataSource(this.roles);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.http.get(this.global.api+'Access/'+this.data.id,this.global.option)
                 .map(response => response.json())
                .subscribe(res => {
                  if ( res.roles==undefined) {
                    this.temparr=[];
                  }else{
                    this.temparr = res.roles;
                    this.userId = res.userId;
                  }

                  this.global.swalClose();
                  if (res.message == 'User not found.') {
                    if (this.data.indicator==0) {
                      this.global.swalAlert("Register the Employee to assign roles",'','warning')
                    }else
                      this.global.swalAlert("Register the Student to assign roles",'','warning')
                    this.dialogRef.close(0);
                  }
                },Error=>{
                  this.global.swalAlertError();
                });
          },Error=>{
            //console.log(Error);
            console.log(Error)
          });
     
   }


   userroles=[]
      ngOnInit() {
        this.http.get(this.global.api+'Access/'+this.global.requestid(),this.global.option)
                 .map(response => response.json())
                .subscribe(res => {
                  this.userroles = res.roles;
                });
      }
   check(role){
        let index = this.temparr.findIndex(e => e === role);
        if (index > -1) {
            return true
          // code...
        }else return false;
    //console.log(this.temparr[index].actions.some(e => e.id === accessId))
  }


  tempArray(role){
     if (role=='Administrator' && !this.userroles.includes('Administrator')) {
       }else{
      let index = this.temparr.findIndex(e => e === role);
      if (index==-1)
        this.temparr.push(role);
      else      
        this.temparr.splice(index, 1);
      }
    }
saveRole(){
  this.global.swalLoading('Updating Assigned Roles...');
	this.http.post(this.global.api+'Access/',{
    userId:this.userId,
		userName:this.data.id,
		roles: this.temparr
	},this.global.option)
       .map(response => response.json())
      .subscribe(res => {
        this.global.swalSuccess('Assigned Roles Updated...');
      },Error=>{
        this.global.swalAlertError();
      });
}

applyFilter(filterValue: string) {
  this.dataSource.filterPredicate = (data:
  {name: string}, filterValue: string) =>
  data.name.trim().toLowerCase().indexOf(filterValue) !== -1;

    this.dataSource.filter = filterValue.trim().toLowerCase();
}
  onNoClick(): void {
    this.dialogRef.close(0);
  }

}
