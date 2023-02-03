import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RoleUpdateComponent } from './role-update/role-update.component';
import { RoleAddComponent } from './role-add/role-add.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import Swal from 'sweetalert2';
import { UserRoleManagementComponent } from './user-role-management/user-role-management.component';
const swal = Swal;
import { EmployeeLookupComponent } from './../../academic/lookup/employee-lookup/employee-lookup.component';

import { StudentLookupComponent } from './../../academic/lookup/student-lookup/student-lookup.component';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {

  image:any = 'assets/noimage.jpg';
  name:any='';
  position:any='';
  position2:any='';
  id:string='';
  checkid:string='';
  pword:string='';
  cpword:string='';
  disabledpword:boolean = false;
  submit:boolean = false;
  isChecked:boolean = false;
  @ViewChild('pword2') namefield: ElementRef;
  locked = true
  disabledlock = false

      userroles
      ngOnInit() {
        this.default()
        this.http.get(this.global.api+'Access/'+this.global.requestid(),this.global.option)
                 .map(response => response.json())
                .subscribe(res => {
                  this.userroles = res.roles;
                });
      }
  constructor(public dialog: MatDialog,private domSanitizer: DomSanitizer,public global: GlobalService,private http: Http) {
     
  }
onSubmit(){
  this.checkid=this.checkid.replace(/\s/g, '')
  this.id=this.id.replace(/\s/g, '')
  if (this.id!=this.checkid) {
    this.global.swalAlert('Account Registration failed!','ID Number did not match with the searched Person. Please Check the inputed ID number.','error')
  }else{  
                          if (this.id!=''&&this.cpword!=''&&this.pword!='') {
                            if (this.cpword!=this.pword) {
                              this.global.swalAlert('Password does not match the confirm password.','','warning');
                            }else
                            {
                              if (this.name == '') {
                                this.global.swalAlert('Must Enter A valid ID!','','warning');
                              }else
                              {
                               this.http.post(this.global.api+'Account/registeruser' ,{
                                  'username':this.id,
                                  'password':this.pword,
                                  'confirmPassword':this.cpword,
                                },this.global.option)
                                    .map(response => response.json())
                                    .subscribe(res => {
                                      this.disabledpword = false;
                                      this.isChecked = false;
                                      this.default()
                                          if (this.submitword=='Register') {
                                            this.http.get(this.global.api+'Access/'+this.id,this.global.option)
                                               .map(response => response.json())
                                               .subscribe(res => {
                                                  var userId = res.userId;
                                                   this.http.post(this.global.api+'Access/',{
                                                        userId:userId,
                                                        userName:this.id,
                                                        roles: ["Employee"]
                                                      },this.global.option)
                                                           .map(response => response.json())
                                                          .subscribe(res => {
                                                            //this.global.swalSuccess('Account Registered!')
                                                            this.submitword='Reset'
                                                            this.indicatorload=2
                                                          },Error=>{
                                                            this.global.swalAlertError();
                                                          });
                                                 },Error=>{
                                                this.global.swalAlertError();
                                              });
                                          }
                                          this.checkaccreg(1,res.message)
                                    },Error=>{
                                      //console.log(Error);
                                      this.global.swalAlertError();
                                      console.log(Error)
                                    });
                              }
                            }
                              
                          }else
                              this.global.swalAlert('Fill all the required fields','','warning');
        
      }
    }
   submitword = ''
   indicatorload=0
   checkaccreg(check,x=null){
     var id=''
       id=this.id;

     this.indicatorload=1
     if (id!='') {
       this.http.get(this.global.api+'Access/'+id,this.global.option)
         .map(response => response.json())
        .subscribe(res => {
          if (res.message == 'User not found.') {
               this.submitword = 'Register';
          }else{
               this.submitword = 'Reset'
          }
          if (x!=null) {
            this.global.swalSuccess(x);
          }
          this.indicatorload=2
        },Error=>{
          this.indicatorload=0
          this.global.swalAlertError();
        });
     }
        
   }
  default(){
    if (this.disabledpword==true){
      this.disabledpword = false;
      this.isChecked = false;
      this.pword = '';
      this.cpword = '';
    }
    else{
      this.disabledpword = true;
      this.isChecked = true;
      this.pword = 'cicm_2019';
      this.cpword = 'cicm_2019';
    }
  }
  clear(){
  this.disabledpword = false;
  this.isChecked = false;
  this.image = 'assets/noimage.jpg';
  this.name = '';
  this.position = '';
  this.submit = false;
  this.disabledpword = false;
      this.pword = '';
      this.cpword = '';
      this.id = '';

  }

keyDownFunction(event) {
  if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {

     if (this.id != '') {
     this.global.swalLoading('Loading Person Information');
     this.http.get(this.global.api+'Employee/PersonalInfo/'+this.id,this.global.option)
                               .map(response => response.json())
                              .subscribe(res => {
                                this.global.swalClose();
                                this.namefield.nativeElement.focus();
                                if (res.message!=undefined&&res.message=='Personal Information Found') {
                                  this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.idPicture);
                                  this.submit = true;
                                  if (res.data.lockoutEnabled==1) {
                                  this.locked = true
                                  }else
                                  this.locked = false
                                          this.http.get(this.global.api+'Employee/'+this.id,this.global.option)
                                             .map(response => response.json())
                                            .subscribe(res => {
                                                this.name = res.data[0].fullname;
                                                this.position = res.data[0].position;
                                                this.checkid=res.data[0].idnumber
                                                this.checkaccreg(1)
                                               this.http.get(this.global.api+'Access/'+res.data[0].idnumber,this.global.option)
                                                     .map(response => response.json())
                                                    .subscribe(res => {
                                                      if (res.message!="User not found.") {
                                                        if (!this.userroles.includes("Administrator")&&res.roles.includes("Administrator")) {
                                                           this.global.swalAlert('Cannot reset an administrator account.','','warning');
                                                            this.submit=false
                                                         }
                                                      }
                                                });
                                            },Error=>{
                                            });
                                }else 
                                {
                                  this.global.swalAlert(res.message,'','warning');
                                }



                              },Error=>{
                                  this.global.swalAlertError();
                              });
    // rest of your code
    }
    // code...
  }
}

  openDialogManageRole(): void {
    //console.log(this.checkid)
    const dialogRef = this.dialog.open(UserRoleManagementComponent, {
      width: '700px',data:{name:this.name,position:this.position,id:this.checkid,image:this.image,indicator:0}, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

   emplookup(): void {
        const dialogRef = this.dialog.open(EmployeeLookupComponent, {
          width: '600px', disableClose: false
        });

        dialogRef.afterClosed().subscribe(result => {
          
          if (result!=undefined) {
            if (result.result!='cancel') {
                this.id = result.result;
                this.keyDownFunction('onoutfocus')
              }
          }
        });
      }

      enable(){
        if (this.locked==true) {
          this.locked=false
        }else
          this.locked=true

        this.updatelock()
      }
      
      updatelock(){
        this.disabledlock = true
        var x = 1
        if (this.locked == false) {
           x = 0
        }
        this.http.put(this.global.api+'Account/LockUnlock/'+this.checkid+'/'+x,{},this.global.option)
               .map(response => response.json())
              .subscribe(res => {
                if (res.message=='Account has been unlocked.'||res.message=='Account has been locked.') {
                  
                }else
                  this.global.swalAlert(res.message,'','warning')
                  this.disabledlock = false
                //console.log(res)
          },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
      }

}