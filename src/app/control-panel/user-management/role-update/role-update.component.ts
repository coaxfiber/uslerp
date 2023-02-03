import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss']
})
export class RoleUpdateComponent implements OnInit {
  roles:any;
  role:string;

  see=0;

  access:any;
  temparr:any;

  enabled=false;
  constructor(public dialogRef: MatDialogRef<RoleUpdateComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { 
    this.global.swalLoading('Loading Access List...');
     this.http.get(this.global.api+'Role/'+this.data.id,this.global.option)
         .map(response => response.json())
        .subscribe(res => {
          if ( res.selectedControllers==null) {
            this.temparr=[];
          }else
          if (res.selectedControllers==null) {
            this.temparr = [];
          }else
          this.temparr = res.selectedControllers
          this.roles = res;
          this.role = res.name;
          //console.log(this.roles)
          this.http.get(this.global.api+'Role/AccessLists',this.global.option)
                 .map(response => response.json())
                .subscribe(res => {
                  this.access = res;
                  this.global.swalClose();
                  
                },Error=>{
                  this.global.swalAlertError();
                });
        },Error=>{
          this.global.swalAlertError();
        });
  }

  putArray(){

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

  checkdept(access,accessId){
    let index = this.temparr.findIndex(e => e.id === access.id);
    if (index > -1) {
      if(this.temparr[index].actions.some(e => e.id === accessId)){
        return true
      }else return false;
      // code...
    }else return false;
    //console.log(this.temparr[index].actions.some(e => e.id === accessId))
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

  updateRole(){
    //console.log(this.temparr)
    if (this.role!='') {
    this.global.swalLoading('Updating Role...');
      this.http.put(this.global.api+'Role/'+this.data.id ,{
              'name':this.role,
              'selectedControllers':this.temparr,
            },this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                    this.global.swalSuccess('Role has been Updated');
                    this.see = 1;
                    this.http.delete(this.global.api+'Access/ViewDomain/'+this.data.id,this.global.option)
                        .map(response => response.json())
                        .subscribe(res => {
                          for (var i = 0; i < this.viewd.length; ++i) {
                           this.http.post(this.global.api+'Access/ViewDomain/',{
                             "roleId": this.data.id,
                              "departmentID": this.viewd[i]
                           },this.global.option)
                            .map(response => response.json())
                            .subscribe(res => {});
                          }
                        });
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
  viewd
  dept
  office
  domain
  depdomain
  officedomain
  ngOnInit() {
      this.http.get(this.global.api+'Auth/UserViewDomains',this.global.option)
         .map(response => response.json())
         .subscribe(res2 => {
           this.domain=res2.data
         });
      this.http.get(this.global.api+'PublicAPI/Departments',this.global.option)
         .map(response => response.json())
         .subscribe(res2 => {
           this.dept=res2
         });

      this.http.get(this.global.api+'PublicAPI/Offices?active='+"1",this.global.option)
         .map(response => response.json())
         .subscribe(res2 => {
           this.office=res2.data
           //console.log(res2.data)
         });

      this.http.get(this.global.api+'Access/ViewDomain/'+this.data.id,this.global.option)
         .map(response => response.json())
         .subscribe(res2 => {
           if (res2.data!=null) {
           this.extractdomain(res2.data)
           }
         });


  }
  onNoClick(): void {
    this.dialogRef.close(this.see);
  }
  extracteddomain=[]
  extractdomain(x){
    this.viewd = []
    for (var i = 0; i < x.length; ++i) {
     this.viewd.push(x[i].departmentID);
    }
    this.extracteddomain=this.viewd;
  }

  checkview(x){
    if (this.viewd.includes(x.toString())) 
      return true
    return false
  }

  clickview(x){
    let index = this.viewd.findIndex(e => e === x.toString());
    if (index==-1) {
        this.viewd.push(x.toString())
      }else{
        this.viewd.splice(index, 1)
      }
   //console.log(this.viewd)
  }

}
